<?php

namespace App\Models;

use Avatar;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'meta_keywords',
        'meta_desc'
    ];

    //relationship
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    //custom
    public function getLogoAttribute()
    {
        if ($this->image && Storage::disk('image')->exists($this->image->filename)) {
            return asset('storage/image/' . $this->image->filename);
        }

        return Avatar::create($this->name)->toBase64();
    }
}
