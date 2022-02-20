<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    use HasFactory;

    protected $fillable = [
        'desc', 'amount', 'note', 'invoice_id'
    ];

    //relationship
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
