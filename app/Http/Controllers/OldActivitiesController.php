<?php

namespace App\Http\Controllers;
use  App\Models\Activity;
use  App\Models\NoteUser;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    public function show ($id)
    {
        // Recuperez la distance envoyé par l'url 
        $distance = request()->query('distance');

        //A cause des données fictives -> recuperer le nb max de participants de l'activité pour limiter le resultat des participants 
        $nb_max_participants = Activity::where('id','=', $id)
                    ->value('nb_max_participants');

        //Récupérez l'activité avec les liaisons aux autres tables 
        // (users, categories, images_activities, note_users, users -> limité au nb max de participants)
        
        $activity = Activity::with(['user', 'category', 'images','users'])
        ->where('activities.id', '=', $id)
        ->join('note_users', 'activities.user_id', '=', 'note_users.user_id')
        ->join('users_has_activities', 'activities.id', '=', 'users_has_activities.activity_id')
        ->select('activities.*', DB::raw('AVG(note_users.note) as average'))
        ->groupBy('activities.id')
        ->with(['users' => function($query) use ($nb_max_participants) {
            $query->take($nb_max_participants);
        }])
        ->get();

        return Inertia::render('ShowActivity', [
            'activity' => $activity,
            'distance' => $distance
        ]);
    }

    public function getActivitiesWithDistance(Request $request) 
    {

        // Récupérez la position du user depuis la requête
            $userLatitude = $request->input('latitude');
            $userLongitude = $request->input('longitude');
            $userRadius = $request->input('radius') | 100;

        //Récupérez les activités avec les liaisons aux autres tables (users, categories, images_activities, note_users)
        $activities = Activity::with(['user','category','images'])
        ->join('note_users', 'activities.user_id', '=', 'note_users.user_id')
        ->select('activities.*', DB::raw('AVG(note_users.note) as average'))
        ->groupBy('activities.id')
        ->get();

        // Parcourez les activités et ajouter un champ distance à chaque activity
        foreach($activities as $activity){
            $activity->distance = $this->calcDistance(
                $userLatitude,
                $userLongitude,
                $activity->latitude,
                $activity->longitude,
            );
            //$activity->note = averageNotes($activity->user_id);
            
        }
    
        return response()->json(
            $activities->values()->where('distance', '<', $userRadius)->all()
        );
    }

    public function store (Request $request)
    {
        $activity = new Activity();
        $activity->title = $request->input('title');
        $activity->localisation = $request->input('localisation');
        $activity->date_activity = $request->input('date_activity');
        $activity->hour = $request->input('hour');
        $activity->duration = $request->input('duration');
        $activity->description = $request->input('description');
        $activity->nb_max_participants = $request->input('nb_max_participants');
        $activity->adress = $request->input('adress');
        $activity->pays = $request->input('pays');

        return Inertia::render('Test', [
            'activity' => $activity,
        ]);
    }

    public function averageNotes($id) {
        //Recupérez la moyenne des notes par user
        $averages = NoteUser::select('user_id', DB::raw('AVG(note) as average'))
                    ->groupBy('user_id')
                    ->get();
        
        foreach ($averages as $average) {
            if ($average->user_id == $id) {
                return $average->average;
            }
        }
        return null;
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

        return round($distance, 2);
    }
    
}
