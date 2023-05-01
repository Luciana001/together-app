<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category; 

class CategoriesController extends Controller
{
    // Liste des catégories
    public function index () {

        $categories = Category::All();
        return response()->json($categories);
    }
}
