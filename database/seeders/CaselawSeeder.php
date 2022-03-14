<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Caselaw;
use Illuminate\Database\Seeder;

class CaselawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (Caselaw::all() as $caselaw) {
            $caselaw->delete();
        }
        for ($i=0; $i < 15; $i++) { 
            $lawyers = User::where('role_id', 2)->inRandomOrder()->limit(3)->get();
            Caselaw::factory()->hasAttached($lawyers)->create();
        }
    }
}
