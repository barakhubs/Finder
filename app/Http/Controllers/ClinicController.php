<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Clinic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClinicController extends Controller
{
    public function index(): \Inertia\Response
    {
        $clinics = Clinic::with(['city', 'category'])->get()->map(function ($clinic) {
            $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
            return $clinic;
        });

        $cities = City::all();

        $categories = Category::all();

        return Inertia::render('Clinics/Index', compact('clinics', 'cities', 'categories'));
    }

    public function list(): \Inertia\Response
    {
        $clinics = Clinic::with(['city', 'category'])->where('status', 'active')->get()->map(function ($clinic) {
            $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
            return $clinic;
        });

        return Inertia::render('SearchResult', [
            'clinics' => $clinics,
            'query' => ""
        ]);
    }

    public function explore(Request $request)
    {
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');

        $clinics = Clinic::all();

        // Calculate distance in PHP
        $clinics = Clinic::with(['city', 'category'])
            ->where('status', 'active')
            ->get()
            ->map(function ($clinic) use ($latitude, $longitude) {
                // Calculate the distance using the Haversine formula
                $clinic->distance = $this->haversine($latitude, $longitude, $clinic->latitude, $clinic->longitude);

                // Add the image URL attribute
                $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');

                return $clinic;
            });

        // Sort clinics by distance
        $clinics = $clinics->sortBy('distance')->values();

        return Inertia::render('Clinics/Explore', [
            'clinics' => $clinics,
        ]);
    }

    public function create(): \Inertia\Response
    {
        $cities = City::all();

        $categories = Category::all();

        return Inertia::render('Clinics/Create', compact('cities', 'categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        \Log::info('Request data before validate: ', $request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:9|min:9',
            'email' => 'nullable|email|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'required|string|min:50',
            'website' => 'nullable|url',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'is_featured' => 'nullable|boolean',
            'category_id' => 'required|exists:categories,id',
            'city_id' => 'required|exists:cities,id',
        ]);
        $clinic = new Clinic($validated);
        $clinic->user_id = auth()->user()->id;
        $clinic->phone_number = "+256 " . $validated["phone_number"];

        if ($request->hasFile('image')) {
            $clinic->image = $request->file('image')->store('images', 'public');
        }
        $clinic->save();

        return redirect()->back()->with('success', 'Clinic added successfully!');
    }

    public function show(Clinic $clinic): \Inertia\Response
    {
        // add view
        $clinic->views = $clinic->views + 1;
        $clinic->save();
        // Eager load the category and city relationships
        $clinic->load('category', 'city');

        // Set the image URL
        $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');

        return Inertia::render('Clinics/Details', [
            'clinic' => $clinic
        ]);
    }


    public function destroy(Clinic $clinic): RedirectResponse
    {
        $clinic->delete();

        return redirect()->route('clinics.index')->with('success', 'Clinic deleted successfully.');
    }

    public function enable(Clinic $clinic): RedirectResponse
    {
        $clinic->status = 'active';
        $clinic->save();

        return redirect()->route('dashboard')->with('success', 'Clinic enabled successfully.');
    }

    public function disable(Clinic $clinic): RedirectResponse
    {
        $clinic->status = 'inactive';
        $clinic->save();

        return redirect()->route('dashboard')->with('success', 'Clinic disabled successfully.');
    }



    private function haversine($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // Radius of the earth in km

        $latDistance = deg2rad($lat2 - $lat1);
        $lonDistance = deg2rad($lon2 - $lon1);

        $a = sin($latDistance / 2) * sin($latDistance / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($lonDistance / 2) * sin($lonDistance / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $distance = $earthRadius * $c; // Distance in km

        return $distance;
    }

}