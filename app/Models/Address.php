<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'line1', 'line2', 'city', 'province', 'postal_code', 'country', 'user_id',
    ];

    //relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
