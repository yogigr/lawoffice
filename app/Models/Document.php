<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'title', 'desc', 'filename', 'caselaw_id', 'user_id'
    ];

    //relationship
    public function caselaw()
    {
        return $this->belongsTo(Caselaw::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //custom
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y H:i:s');
    }
}
