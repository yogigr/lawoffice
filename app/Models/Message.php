<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    //custom
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
