<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Book::updateOrCreate(['title' => 'Example Book 1', 'author' => 'Author 1', 'description' => 'Description 1']);
        Book::updateOrCreate(['title' => 'Example Book 2', 'author' => 'Author 2', 'description' => 'Description 2']);
    }
}
