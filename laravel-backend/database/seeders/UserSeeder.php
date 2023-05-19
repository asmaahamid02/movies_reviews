<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()
            ->create();

        $admin->assignRole('admin');

        User::factory(200)
            ->create()->each(function ($user) {
                $user->assignRole('user');
            });
    }
}