<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password','pseudo', 'short_description', 'long_description', 'date_naissance', 'locality','country','radius'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    // users qui se suivent entre eux
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_has_users', 'follower_id', 'following_id');
    }

    // categories choisies par le user dans son profil
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'users_has_categories', 'user_id', 'category_id');
    }

    // users qui participent aux activités
    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'users_has_activities', 'user_id', 'activity_id');
    }

    // user qui organise l'activité
    public function ogranisateur()
    {
        return $this->hasMany(Activity::class);
    }

    // notes par utilisateur
    public function notesUser()
    {
        return $this->hasMany(NoteUser::class);
    }

    
    // récupérer l'id du user dont la session est en cours
    public static function getAuthenticatedUserId()
    {
        $user = auth()->user();
        return $user ? $user->id : null;
    }

    

}
