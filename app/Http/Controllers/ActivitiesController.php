<?php

namespace App\Http\Controllers;
use  App\Models\Activity;
use Inertia\Inertia;

use Illuminate\Http\Request;

class ActivitiesController extends Controller
{
    // Liste des activités
    // public function index () {
    //     $activities = Activity::select('*', 'activities.title as activityTitle',
    //         'users.name as userName', 'activities.id as activityId', 'users.id as userId')
    //         ->join('users', 'activities.user_id', '=','users.id')->get();

    //     return Inertia::render('Dashboard',[
    //         'activities' => $activities
    //     ]);
    // }

    // Détail d'une activité
    public function show ($id)
    {
        $activity = Activity::select('*', 'activities.title as activityTitle',
        'users.name as userName', 'activities.id as activityId', 'users.id as userId')
        ->join('users', 'activities.user_id', '=','users.id')
        ->where('activities.id', '=', $id)
        ->get();

        return Inertia::render('ShowActivity', [
            'activity' => $activity
        ]);
    }

    public function getActivitiesWithDistance(Request $request) 
    {

        // Récupérez la position du user depuis la requête
            $userLatitude = $request->input('');
            $userLongitude = $request->input('');
            $userRadius = $request->input('radius') | 100;

        //Récupérez les activités avec les liaisons aux autres tables
        $activities = Activity::with('user')->get();

        // Parcourez les activités et ajouter un champ distance à chaque activity
        foreach($activities as $activity){
            $activity->distance = $this.calcDistance(
                $userLatitude,
                $userLongitude,
                $activity->latitude,
                $activity->longitude,
            );
        }
    
        return response()->json($activities->values->where('distance', '<', $radius)->all());
    }

    public function calcDistance($activityLatitude, $activityLongitude, $userLatitude, $userLongitude) 
    {
        $earthRadiusKm = 6371;
        $dLat = deg2rad($userLatitude - $activityLatitude);
        $dLon = deg2rad($userLongitude - $activityLongitude);
        $activityLatitude = deg2rad($activityLatitude);
        $userLatitude = deg2rad($userLatitude);
        $a = sin($dLat/2) * sin($dLat/2) + sin($dLon/2) * sin($dLon/2) * cos($activityLatitude) * cos($userLatitude);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        $distance = $earthRadiusKm * $c;
        return $distance;
    }
    
}
