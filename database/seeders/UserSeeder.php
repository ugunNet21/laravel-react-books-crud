<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create roles
        $adminRole = Role::updateOrCreate(['name' => 'admin']);
        $managerRole = Role::updateOrCreate(['name' => 'manager']);
        $memberRole = Role::updateOrCreate(['name' => 'member']);

        // Create an admin user
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@admin.com'], // Condition to find existing user
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $adminUser->assignRole($adminRole);

        // Create a manager user
        $managerUser = User::updateOrCreate(
            ['email' => 'manager@example.com'], // Condition to find existing user
            [
                'name' => 'Manager User',
                'password' => Hash::make('password123'),
            ]
        );
        $managerUser->assignRole($managerRole);

        // Create a member user
        $memberUser = User::updateOrCreate(
            ['email' => 'member@example.com'], // Condition to find existing user
            [
                'name' => 'Member User',
                'password' => Hash::make('password123'),
            ]
        );
        $memberUser->assignRole($memberRole);
    }

}
