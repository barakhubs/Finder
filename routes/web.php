<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\City;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
            'randomClinics' => Clinic::with(['city', 'category'])
                ->inRandomOrder()
                ->limit(6) // Adjust the limit as needed
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'featuredClinics' => Clinic::with(['city', 'category'])
                ->where('is_featured', true)
                ->inRandomOrder()
                ->limit(4) // Adjust the limit as needed
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'latestClinics' => Clinic::with(['city', 'category'])
                ->latest()
                ->limit(4) // Adjust the limit as needed
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'popularClinics' => Clinic::with(['city', 'category'])
                ->orderBy('views', 'desc')
                ->limit(4) // Adjust the limit as needed
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

    ]);

})->name('home');

Route::get('/dashboard', function () {
    $categoriesCount = Category::all()->count();
    $citiesCount = City::all()->count();
    $clinicsCount = Clinic::all()->count();
    $managersCount = User::where('role', 'manager')->get()->count();

    return Inertia::render('User/Index', [
        'categoriesCount' => $categoriesCount,
        'citiesCount' => $citiesCount,
        'clinicsCount' => $clinicsCount,
        'managersCount' => $managersCount,
        'can' => [
            'admin-only' => Auth::user()->can('admin-only', User::class),
        ],
        'clinics' => Clinic::with(['city', 'category'])->get()->map(function ($clinic) {
            $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
            return $clinic;
        })
    ]);

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'destroy']);

    Route::resource('cities', CityController::class)
        ->only(['index', 'store', 'destroy']);

    Route::resource('clinics', ClinicController::class)
        ->only(['index', 'create', 'store', 'update', 'show', 'destroy']);

    Route::post('clinics/{clinic}/enable', [ClinicController::class, 'enable'])->name('clinic.enable');
    Route::post('clinics/{clinic}/disable', [ClinicController::class, 'disable'])->name('clinic.disable');

    Route::get('/user', [UserController::class, 'index'])->name('user.index');
});

require __DIR__ . '/auth.php';