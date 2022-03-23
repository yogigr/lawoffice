<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //admin
        User::factory()->create([
            'name' => 'Yogi Gilang Ramadhan',
            'email' => 'yogigilang182@gmail.com',
            'role_id' => 1,
            'gender' => 'm'
        ]);

        User::factory()->create([
            'name' => 'Gian Tantowi',
            'email' => 'giantantowi@gmail.com',
            'role_id' => 1,
            'gender' => 'm'
        ]);

        User::factory()->create([
            'name' => 'Marintan Vira',
            'email' => 'marintan.vira@gmail.com',
            'role_id' => 1,
            'gender' => 'f'
        ]);

        /*
        //lawyer
        User::factory()->count(15)->create(['role_id' => 2]);

        //client
        User::factory()->count(25)->create();
        */
    }
}
