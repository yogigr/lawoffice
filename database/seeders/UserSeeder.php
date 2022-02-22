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
            'name' => 'Administator',
            'email' => 'admin@admin.com',
            'role_id' => 1,
            'gender' => 'm'
        ]);

        //lawyer
        User::factory()->count(15)->create(['role_id' => 2]);

        //client
        User::factory()->count(25)->create();
    }
}
