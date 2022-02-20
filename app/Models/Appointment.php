<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'date', 'time', 'title', 'desc', 'type', 'location', 'caselaw_id' 
    ];

    //relationship
    public function caselaw()
    {
        return $this->belongsTo(Caselaw::class);
    }
}
