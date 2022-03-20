<?php

namespace App\Models;

use Avatar;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Kyslik\ColumnSortable\Sortable;
use Illuminate\Support\Facades\Storage;
use App\Notifications\VerifyEmailQueued;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, Sortable;

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

    public $sortable = [
        'id', 'name', 'email',
    ];

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

    //for lawyers
    public function caselaws()
    {
        return $this->belongsToMany(Caselaw::class, 'caselaw_user');
    }

    // for clients
    public function cases()
    {
        return $this->hasMany(Caselaw::class, 'client_id');
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

    public function getAgeAttribute()
    {
        return Carbon::parse($this->date_of_birth)->age;
    }

    //send email verifications
    public function sendEmailVerificationNotification()
    {
        $this->notify(
            (new VerifyEmailQueued())->delay(
                now()->addMinutes(config('notifications.delay_in_minutes'))
            )
        );
    }
}
