<?php

namespace App\Models;

use Avatar;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'date_of_birth',
        'gender',
        'mobile'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public $appends = ['picture'];

    //relationship
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function caselaws()
    {
        return $this->belongsToMany(Caselaw::class, 'caselaw_user');
    }

    //custom
    public function getPictureAttribute()
    {
        if ($this->image && Storage::disk('image')->exists($this->image->filename)) {
            return asset('storage/image/' . $this->image->filename);
        }

        return Avatar::create($this->name)->toBase64();
    }

    public function getPermissionsAttribute()
    {
        switch ($this->role_id) {
            case 2:
                return config('lawyer.permissions');
                break;
            case 3:
                return config('client.permissions');
                break;
            default:
                return config('permissions');
                break;
        }
    }
}
