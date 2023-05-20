<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'users_has_categories', 'category_id', 'user_id');
    // }

    public function activities() {
        return $this->hasMany(Activity::class);
    }
}
