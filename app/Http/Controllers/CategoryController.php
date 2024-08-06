<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(): \Inertia\Response
    {
        $categories = Category::with('clinics')->latest()->get();

        return Inertia::render('Categories/Index', compact('categories'));
    }

    public function store(): RedirectResponse
    {
        request()->validate([
            'name' => ['required','unique:categories']
        ]);

        Category::create(request(['name']));

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}