<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookTranslation extends Model
{
    use HasFactory;
    protected $fillable = ['book_id', 'locale', 'title', 'author', 'description'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
