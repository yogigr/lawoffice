<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Role extends Model
{
    use HasFactory, Sortable;

    protected $fillable = [
        'name',
        'description',
    ];

    public $sortable = ['name'];

    //relationships
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
