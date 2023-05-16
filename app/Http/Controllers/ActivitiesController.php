<?php

namespace App\Http\Controllers;
use  App\Models\Activity;
use  App\Models\NoteUser;
use  App\Models\User;
use App\Models\ImagesActivity;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ActivitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        
    }
    public function getActivitiesWithDistance(Request $request)
    {
        // Récupérez la position du user depuis la requête
        $userLatitude = $request->input('latitude');
        $userLongitude = $request->input('longitude');
        $userRadius = $request->input('radius') | 100;

        //Récupérez les activités avec les liaisons aux autres tables (users, categories, images_activities, note_users)
        $activities = DB::table('activities AS a')
        ->leftjoin(DB::raw('(SELECT user_id, AVG(note_users.note) AS avg_note FROM note_users GROUP BY user_id) AS d'), 'd.user_id', '=', 'a.user_id')
        ->join('categories AS c', 'c.id', '=', 'a.category_id')
        ->join('users AS us', 'us.id', '=', 'a.user_id')
        ->select('a.*', 'd.*', 'us.name AS name_user', 'c.name AS name_category', 'c.image AS image_category')
        ->get();
        //dd($activities);


        // Parcourir les activités et ajouter un champ distance à chaque activity
        foreach($activities as $activity){
            $activity->distance = $this->calcDistance(
                $userLatitude,
                $userLongitude,
                $activity->latitude,
                $activity->longitude,
            );
            $activity->image = 'image_8.jpg';
        }

        // Renvoyer le tableau des activités dont la distance est inferieur à 100
        return response()->json(
            $activities->values()->where('distance', '<', $userRadius)->all()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AddForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des inputs
        $validated = $request->validate([
            'title'               => 'max:255',
            'localisation'        => 'max:255',
            'date_activity'       => 'date',
            'hour'                => 'date_format:H:i',
            'duration'            => 'date_format:H:i',
            'description'         => 'alpha_num',
            'nb_max_participants' => 'integer',
            'category_id'         => 'integer',
            "adress"              => 'max:255',
            "pays"                => 'max:255',
            'image'               => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Récupérer la latitude et longitude de l'activité en fonction de l'adresse: rue + localité
        $coordinates = $this->getCoordinates($request->adress, $request->localisation);

        // Inserer les coordonnées dans le tableau $validated
        $validated['longitude'] = $coordinates['longitude'];
        $validated['latitude'] = $coordinates['latitude'];

        // --------------------- USER ---------------------------------------------

        // Récupérer l'id du user actuellement authentifié 
        $userId = User::getAuthenticatedUserId();

        // mettre l'id du user dans $validated
        $validated['user_id'] = $userId;

        // --------------------- Insertion ---------------------------------------------

        // Insérer la nouvelle activité dans bd et récupérer son id
        $activity = Activity::create($validated);

        // --------------------- IMAGE ---------------------------------------------

        // Récupérer l'image envoyée avec la requête
        $image = $request->file('image');

        // Vérifier si une image a été téléchargée
        if ($image) {
            // Upload de l'image
            $imageName = time() . '_' . $image->getClientOriginalName();

            // Enregistrer l'image dans le bon dossier
            $image->storeAs('img/activites', $imageName);

            // Créer l'image dans la base de données avec l'ID de l'activité associée
            $newImage = ImagesActivity::create([
                'name' => $imageName, 
                'activity_id' => $activity->id
            ]);
        }
        
         // Rediriger vers la page Dashboard
            return to_route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Recuperez la distance envoyé par l'url 
        $distance = request()->query('distance');

        //A cause des données fictives -> recuperer le nb max de participants de l'activité pour limiter le resultat des participants 
        $nb_max_participants = Activity::where('activities.id','=', $id)
                    ->value('nb_max_participants');

        //Récupérez l'activité avec les liaisons aux autres tables 
        // (users, categories, images_activities, note_users, users -> limité au nb max de participants)
        
        $activity = DB::table('activities AS a')
            ->where('a.id', '=', $id)
            ->join(DB::raw('(SELECT user_id, AVG(note_users.note) AS avg_note FROM note_users GROUP BY user_id) AS d'), 'd.user_id', '=', 'a.user_id')
            ->join('categories AS c', 'c.id', '=', 'a.category_id')
            ->join('users AS us', 'us.id', '=', 'a.user_id')
            ->leftJoin('images_activities AS ia', 'ia.activity_id', '=', 'a.id')
            ->select('a.*', 'd.*', 'us.name AS name_user', 'us.profile_photo_path as image_user', 'c.name AS name_category', 'c.image AS image_category', 'ia.activity_id', 'ia.name AS image_activity')
            ->get();

        // Récupérer les users liès à l'activité, limité au nb max de participants (données fictives)
        $participants = User::select('*')
            ->whereHas('activities', function ($query) use ($id) {
                $query->where('activities.id', $id);
        })->take($nb_max_participants)->get()->toArray();
        
        // Creer une propriete participants a activity et inserer la liste de participants
        $activity->participants= [];
        $activity['participants'] = array_merge($activity->participants, $participants);
        
        return Inertia::render('ShowActivity', [
            'activity' => $activity,
            'distance' => $distance,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    
    public function getCoordinates($adress, $localisation)
    {
        $API_KEY = 'AIzaSyDS4utYTJlu_9k5HtFibwhxn9oZOwayMfU';
        $address = urlencode($adress);
        $localisation = urlencode($localisation);

        $response = Http::get("https://maps.googleapis.com/maps/api/geocode/json?address=$adress+$localisation&key=$API_KEY");
        
        $body = $response->json();

        if ($response->ok() && isset($body['results'][0])) {
            $result = $body['results'][0];
            $location = $result['geometry']['location'];
            $longitude = $location['lng'];
            $latitude = $location['lat'];
            return compact('longitude', 'latitude');
        } else {
            abort(500, 'Unable to retrieve coordinates.');
        }
    }

    // public function averageNotes($id) {
    //     //Recupérez la moyenne des notes par user
    //     $averages = NoteUser::select('user_id', DB::raw('AVG(note) as average'))
    //                 ->groupBy('user_id')
    //                 ->get();
        
    //     foreach ($averages as $average) {
    //         if ($average->user_id == $id) {
    //             return $average->average;
    //         }
    //     }
    //     return null;
    // }

    public function calcDistance($activityLatitude, $activityLongitude, $userLatitude, $userLongitude) 
    {
        // Calculer la distance entre l'utilisateur et l'activité en prenant en parametres :
        // - longitude du user et de l'activité
        // - latitude du user et de l'activité
        // et en prenant en compte lla circonférence de la terre
        //dd($activityLatitude, $activityLongitude);
        $earthRadiusKm = 6371;
        $dLat = deg2rad($userLatitude - $activityLatitude);
        $dLon = deg2rad($userLongitude - $activityLongitude);
        $activityLatitude = deg2rad($activityLatitude);
        $userLatitude = deg2rad($userLatitude);
        $a = sin($dLat/2) * sin($dLat/2) + sin($dLon/2) * sin($dLon/2) * cos($activityLatitude) * cos($userLatitude);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        $distance = $earthRadiusKm * $c;

        // Retourner le résultat arrondi à 2 chifres après la virgule
        return round($distance, 2);
    }
}
