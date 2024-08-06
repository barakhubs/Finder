<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): \Inertia\Response
    {
        // $clinics = Clinic::with(['city', 'category'])->get()->map(function ($clinic) {
        //     $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
        //     return $clinic;
        // });

        // $cities = City::all();

        // $categories = Category::all();

        return Inertia::render('Profile/Index');
    }
}