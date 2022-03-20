<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('banks')->insert([
            ['id' => 1, 'name' => 'BRI', 'number' => '123-123-1234', 'owner' => 'PT SEJAHTERA BANGET'],
            ['id' => 2, 'name' => 'BCA', 'number' => '123-123-1234', 'owner' => 'PT SEJAHTERA BANGET'],
            ['id' => 3, 'name' => 'MANDIRI', 'number' => '123-123-1234', 'owner' => 'PT SEJAHTERA BANGET'],  
        ]);
    }
}
