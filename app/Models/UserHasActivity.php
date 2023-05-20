<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHasActivity extends Model
{
    use HasFactory;
    protected $table = 'users_has_activities';

    // Définir les colonnes supplémentaires de la table de liaison
    protected $fillable = ['activity_id', 'user_id'];

    // Définir les colonnes qui doivent être cachées lors de la conversion en tableau/json
    protected $hidden = ['pivot'];

    // Méthode pour lier les utilisateurs et les activités
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
