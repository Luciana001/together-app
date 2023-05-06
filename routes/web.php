<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\CategoriesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    //Route pour les users connectés
    Route::get('/dashboard', function(){
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('/activities', ActivitiesController::class);

    Route::get('/categories', [CategoriesController::class, 'index']);

    // Route::get('/activities/{id}', [ActivitiesController::class, 'show'])
    //         ->name('activities.show');

    // Route::get('/addForm', function () {
    //     return Inertia::render('AddForm');
    // })->name('addForm');

    // Route::post('/activities', [ActivitiesController::class, 'store'])
    //     ->name('activities.store');

});
