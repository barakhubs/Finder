<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clinic;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;
use GuzzleHttp\Client;

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
        $client = new Client();

        // Ensure the storage directory exists
        Storage::disk('public')->makeDirectory('images');

        for ($i = 0; $i < 40; $i++) {
            // Fetch a random image from Unsplash
            $response = $client->get('https://api.unsplash.com/photos/random', [
                'query' => [
                    'client_id' => '4x5d7UU89GkiMuimx2uZelFa0TndwnwBHri-A6fYIf8', // Replace with your Unsplash access key
                    'query' => 'clinic', // Search term related to clinics
                    'orientation' => 'portrait',
                ],
            ]);

            $imageData = json_decode($response->getBody(), true);
            $imageUrl = $imageData['urls']['regular'];

            // Download the image
            $imageContent = file_get_contents($imageUrl);
            $imageName = 'clinic_' . uniqid() . '.jpg';
            Storage::disk('public')->put('images/' . $imageName, $imageContent);

            // Generate random latitude and longitude within Uganda
            $latitude = $faker->latitude($min = -1.5, $max = 4.2);
            $longitude = $faker->longitude($min = 29.5, $max = 35.0);

            Clinic::create([
                'name' => $faker->company,
                'address' => $faker->address,
                'phone_number' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'status' => $faker->randomElement(['active', 'inactive']),
                'latitude' => $latitude,
                'longitude' => $longitude,
                'description' => $faker->text(250),
                'website' => $faker->url,
                'image' => 'images/' . $imageName,
                'views' => $faker->numberBetween(0, 1000),
                'is_featured' => $faker->boolean,
                'category_id' => $faker->numberBetween(1, 5), // Adjust based on your categories
                'city_id' => $faker->numberBetween(1, 9), // Adjust based on your cities
                'user_id' => 1, // Adjust based on your users
            ]);
        }
    }
}