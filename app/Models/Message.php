<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'text', 'user_id', 'caselaw_id'
    ];

    //relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function caselaw()
    {
        return $this->belongsTo(Caselaw::class);
    }
}
