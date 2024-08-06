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
}
