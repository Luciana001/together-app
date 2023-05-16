<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title', 'localisation', 'date_activity', 'hour', 'durataion', 'description', 'nb_max_participants', 'category_id','user_id','latitude', 'longitude', 'adress',' pays'
    ];
    
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_has_activities', 'activity_id', 'user_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        // A verifier sans la precision de la table et des noms de colonnes -> , 'images_activities', 'activity_id', 'name')->withPivot('name'
        return $this->hasMany(ImagesActivity::class);
    }

    public function notes()
    //, 'notes_activities', 'activity_id', 'note'
    {
        return $this->hasMany(NoteActivity::class);
    }
}
