<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index(): \Inertia\Response
    {
        $cities = City::with('clinics')->latest()->get();

        return Inertia::render('Cities/Index', compact('cities'));
    }

    public function store(): RedirectResponse
    {
        request()->validate([
            'name' => ['required','unique:cities']
        ]);

        City::create(request(['name']));

        return redirect()->route('cities.index')->with('success', 'City created successfully.');
    }

    public function destroy(City $city): RedirectResponse
    {
        $city->delete();

        return redirect()->route('cities.index')->with('success', 'City deleted successfully.');
    }
}