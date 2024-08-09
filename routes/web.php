<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\City;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
            'randomClinics' => Clinic::with(['city', 'category'])
                ->inRandomOrder()
                ->limit(6) // Adjust the limit as needed
                ->where('status', 'active')
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'featuredClinics' => Clinic::with(['city', 'category'])
                ->where('is_featured', true)
                ->inRandomOrder()
                ->limit(4) // Adjust the limit as needed
                ->where('status', 'active')
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'latestClinics' => Clinic::with(['city', 'category'])
                ->latest()
                ->limit(4) // Adjust the limit as needed
                ->where('status', 'active')
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),

            'popularClinics' => Clinic::with(['city', 'category'])
                ->orderBy('views', 'desc')
                ->limit(4) // Adjust the limit as needed
                ->where('status', 'active')
                ->get()
                ->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),
            'auth' => Auth::user()

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
        'clinics' => Clinic::with(['city', 'category'])
                ->latest()
                ->orderBy('status', 'desc')
                ->get()->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),
        'auth' => Auth::user()
    ]);

})->middleware(['auth', 'verified', 'can:admin-only'])->name('dashboard');

Route::get('/dashboard/manager', function () {

    return Inertia::render('User/Manager', [
        'clinics' => Clinic::with(['city', 'category'])
                ->where('user_id', auth()->user()->id)
                ->get()->map(function ($clinic) {
                    $clinic->image_url = $clinic->image ? asset('storage/' . $clinic->image) : asset('default-image.jpg');
                    return $clinic;
                }),
        'auth' => Auth::user()
    ]);

})->middleware(['auth', 'verified'])->name('dashboard.manager');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'destroy']);

    Route::resource('cities', CityController::class)
        ->only(['index', 'store', 'destroy']);

    Route::resource('clinics', ClinicController::class)
        ->only(['index', 'create', 'store', 'update', 'destroy']);

    Route::post('clinics/{clinic}/enable', [ClinicController::class, 'enable'])->name('clinic.enable');
    Route::post('clinics/{clinic}/disable', [ClinicController::class, 'disable'])->name('clinic.disable');
    Route::get('clinics/list', [ClinicController::class, 'list'])->name('clinic.list');

    Route::get('/user', [UserController::class, 'index'])->name('user.index');
});

Route::get('clinics/{clinic}', [ClinicController::class, 'show'])->name('clinics.show');

Route::get('/search', [SearchController::class, 'search'])->name('search.post');
Route::get('/list', [ClinicController::class, 'list'])->name('clinic.list');
Route::get('/explore', [ClinicController::class, 'explore'])->name('clinic.explore');

require __DIR__ . '/auth.php';
