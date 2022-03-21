<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'date', 'due_date', 'caselaw_id', 'tax', 'discount', 'note', 'is_paid'
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

    //custom
    public function getSubtotalAttribute()
    {
        $subtotal = 0;
        foreach ($this->details as $detail) {
            $subtotal += $detail->amount;
        }
        return $subtotal;
    }

    public function getTotalAttribute()
    {
        return $this->subtotal + $this->tax - $this->discount;
    }

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->date)->format('d/m/Y');
    }

    public function getDueDateFormattedAttribute()
    {
        return Carbon::parse($this->due_date)->format('d/m/Y');
    }
}
