<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cities = [
            ['name' => 'Kampala'],
            ['name' => 'Entebbe'],
            ['name' => 'Jinja'],
            ['name' => 'Gulu'],
            ['name' => 'Mbarara'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}