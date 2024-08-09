<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone_number',
        'email',
        'status',
        'latitude',
        'longitude',
        'description',
        'website',
        'image',
        'views',
        'is_featured',
        'category_id',
        'city_id',
        'user_id',
    ];

    public function city ()
    {
        return $this->belongsTo(City::class);
    }

    public function category ()
    {
        return $this->belongsTo(Category::class);
    }

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSearch($query, $searchTerm)
    {
        return $query->where('name', 'like', '%' . $searchTerm . '%')
            ->orWhereHas('category', function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->orWhereIn('category_id', function($q) use ($searchTerm) {
                $q->select('id')
                  ->from('categories')
                  ->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->where('status', 'active');
    }
}