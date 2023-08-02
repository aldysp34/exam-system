<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectDetection extends Model
{
    use HasFactory;
    protected $table = 'object_detections';
    protected $fillable = ['user_id', 'test_id', 'filepath', 'proctor_data'];
}
