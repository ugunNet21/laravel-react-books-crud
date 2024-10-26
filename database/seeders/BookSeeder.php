<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Buat 10 buku dengan terjemahan
        Book::factory()
            ->count(10)
            ->create()
            ->each(function ($book) {
                // Buat terjemahan untuk setiap buku
                $book->translations()->createMany([
                    [
                        'locale' => 'en',
                        'title' => $book->title,
                        'author' => $book->author,
                        'description' => $book->description,
                    ],
                    [
                        'locale' => 'id',
                        'title' => 'Contoh ' . $book->title,
                        'author' => 'Penulis ' . $book->author,
                        'description' => 'Deskripsi ' . $book->description,
                    ],
                ]);
            });
    }
}
