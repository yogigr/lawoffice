<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    //custom
    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->date)->format('d/m/Y');
    }
}
