<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clinic;
use App\Models\Category;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $clinics = Clinic::search($query)->with('category')
        ->get()->map(function ($clinic) {
            $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
            return $clinic;
        });

        return Inertia::render('SearchResult', [
            'clinics' => $clinics,
            'query' => $request->input('query'),
        ]);
    }
}