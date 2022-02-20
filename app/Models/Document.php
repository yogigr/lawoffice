<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'title', 'desc', 'filename', 'caselaw_id'
    ];

    //relationship
    public function caselaw()
    {
        return $this->belongsTo(Caselaw::class);
    }
}
