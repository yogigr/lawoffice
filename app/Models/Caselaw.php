<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Caselaw extends Model
{
    use HasFactory, Sortable;

    protected $fillable = [
        'code', 'start_date', 'end_date', 'title', 'desc', 'service_id', 'status_id', 'client_id'
    ];

    public $sortable = [
        'id', 'code', 'start_date', 'end_date', 'title', 'desc', 'created_at', 'updated_at'
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

    public function users()
    {
        return $this->belongsToMany(User::class, 'caselaw_user');
    }
}
