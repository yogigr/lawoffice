<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caselaw extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'start_date', 'end_date', 'title', 'desc', 'service_id', 'status_id', 'client_id'
    ];

    //relationship
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
