<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'about',
        'facebook_link',
        'instagram_link',
        'twitter_link',
        'email',
        'phone',
        'address',
        'meta_title',
        'meta_desc'
    ];

    //relationship
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
