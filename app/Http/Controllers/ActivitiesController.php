<?php

namespace App\Http\Controllers;
use  App\Models\Activity;
use  App\Models\NoteUser;
use  App\Models\User;
use  App\Models\UserHasActivity;
use App\Models\ImagesActivity;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
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
        $activities = Activity::with('category', 'users', 'images', 'user')->get();

        // pour chaque activité recuperer les données satelites
        foreach ($activities as $activity) {

            //A cause des données fictives 
            // -> recuperer le nb max de participants de l'activité pour limiter le resultat des participants 
            $nb_max_participants = $this->countParticipants($activity->id);

            // recuperer le nb de participants limités au nb max de participants autorisés
            $userHasActivities = $this->getParticipants($activity->id, $nb_max_participants);

            // récupérer la liste de participants
            $users = $userHasActivities->map(function ($userHasActivity) {
                return $userHasActivity->user;
            });
            $activity->setRelation('users', $users);

            // faire la moyenne des notes de l'organisateur
            $averageNote = $this->averageNotes($activity->user_id);

            // ajouter un champ averageNote et sa valeur
            $activity->averageNote = $averageNote;

            // ajouter un champ distance à l'activity avec la valeur calculée
            $activity->distance = $this->calcDistance(
                $userLatitude,
                $userLongitude,
                $activity->latitude,
                $activity->longitude,
            );
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
        //dd($request->all());
        // Validation des inputs
        $validated = $request->validate([
            'title'               => 'max:255',
            'localisation'        => 'max:255',
            'date_activity'       => 'date',
            'hour'                => 'date_format:H:i',
            'duration'            => 'date_format:H:i',
            'description'         => 'string',
            'nb_max_participants' => 'integer',
            'category_id'         => 'integer',
            "adress"              => 'max:255',
            "pays"                => 'max:255',
            'image'               => 'image|mimes:jpeg,png,jpg,gif',
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
            $image->storeAs('public/activites', $imageName);

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
        $nb_max_participants = $this->countParticipants($id);

        //Récupérez l'activité par son id avec les liaisons aux autres tables 
        $activity = Activity::with('category', 'users', 'images', 'user')->findOrFail($id);

        $userHasActivities = $this->getParticipants($activity->id, $activity->nb_max_participants);

        // récupérer la liste de participants
        $users = $userHasActivities->map(function ($userHasActivity) {
            return $userHasActivity->user;
        });
    
        // attribuer la relation users à l'activité
        $activity->setRelation('users', $users);

        // faire la moyenne des notes des users
        $averageNote = $this->averageNotes($activity->user_id);

        // attribuer la moyenne de la note à l'activité
        $activity->averageNote = $averageNote;

        // attribuer la distance à l'activité
        $activity->distance = $distance;
        
        return Inertia::render('ShowActivity', [
            'activity' => $activity,
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

        // Obtenir grâce à une clé API les coordonnées de la nouvelle activité en fonction de l'adresse et la localisation
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

    public function averageNotes($id) {
        //Recupérez la moyenne des notes par user
        $avg = DB::table('note_users')
                ->where('user_id', $id)
                ->avg('note');

        return $avg;
    }

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

    public function countParticipants($id) {

        // Récupérer le nb de participants autorisés pour l'activité
        $participants = Activity::where('activities.id','=', $id)
                    ->value('nb_max_participants');
        if($participants === null){
            $participants = 0;
        }
        return $participants;
    }

    public function getParticipants($id, $participantsMax) {

        // Récuperer la liste des prticipants limités au nb max autorisés (données fictives)
        $users = UserHasActivity::where('activity_id', $id)->take($participantsMax)->get();

        return $users;
    }
}
