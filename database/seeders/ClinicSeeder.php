<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clinic;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Ensure the storage directory exists
        Storage::disk('public')->makeDirectory('images');

        for ($i = 0; $i < 10; $i++) {
            $image = $faker->image(storage_path('app/public/images'), 500, 500, null, false);

            Clinic::create([
                'name' => $faker->company,
                'address' => $faker->address,
                'phone_number' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'status' => $faker->randomElement(['active', 'inactive']),
                'latitude' => $faker->latitude,
                'longitude' => $faker->longitude,
                'description' => $faker->text,
                'website' => $faker->url,
                'image' => 'images/' . $image,
                'views' => $faker->numberBetween(0, 1000),
                'is_featured' => $faker->boolean,
                'category_id' => $faker->numberBetween(1, 5), // Adjust based on your categories
                'city_id' => $faker->numberBetween(1, 5), // Adjust based on your cities
                'user_id' => 1, // Adjust based on your users
            ]);
        }
    }
}