<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesActivity extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'activity_id'];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
