<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivitiesController;

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
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    //Route pour les users connectés
    // Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard', [
    //         'activities' => App\Models\Activity::select('*', 'activities.title as activityTitle',
    //         'users.name as userName', 'activities.id as activityId', 'users.id as userId')
    //         ->join('users', 'activities.user_id', '=','users.id')->get()
    //     ]);
    // })->name('dashboard');

    // Route::get('/dashboard', [ActivitiesController::class, 'index'])
    //         ->name('dashboard');
    Route::get('/activities/{id}', [ActivitiesController::class, 'show'])
            ->name('activities.show');
});
