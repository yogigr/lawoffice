<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'date', 'due_date', 'caselaw_id', 'tax', 'discount', 'note'
    ];

    //relationship
    public function caselaw()
    {
        return $this->belongsTo(Caselaw::class);
    }

    public function details()
    {
        return $this->hasMany(Detail::class);
    }
}
