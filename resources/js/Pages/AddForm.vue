<script setup>
import { ref, onMounted } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import SecondaryNavigation from '../components/SecondaryNavigation.vue';
import TitleSection from '../components/TitleSection.vue';
import InputLabel from '../components/InputLabel.vue';
import FormSection from '../components/FormSection.vue';
import BtnPrimary from '../components/BtnPrimary.vue';
import BtnCreate from '../components/BtnCreate.vue';;


// Récupérer la liste des catégories
let categories = ref([])
onMounted(() => {
    axios.get('/api/categories')
        .then(response => categories.value = response.data)
        .catch(error => console.log(error));
});


const activity = ref([]);
const name = ref('');
const value = ref('');

// Récupérer la valeur et la clé des input pour creer un nouveau tableau 
const saveValueInput =  ( payLoad ) =>
{
    name.value = payLoad.name;
    value.value = payLoad.value;
    activity.value[name.value] = value.value;
}

// Envoyer les données du formulaire
function submitForm () {
    post('/activities', activity.value);
}


</script>

<template>
    
    <AppLayout title="addForm" class="bg-blue-50">
        <template #nav>
            <SecondaryNavigation class="bg-teal"/>
            
        </template>
        <template #header>
            <div class="mx-8 pt-16">
                <TitleSection class="font-extrabold text-gray-700 py-6 text-xl" value="Créer une nouvelle activité"/>
                {{ activity.value }}
            </div>
        </template>
        <template #main>
            <FormSection :action="route('activities.store')" method="POST">
                <template #header>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="file" label="Choisir une image"  id="image"/>
                    </div>
                </template>
                <template #main>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Titre de l'activité"  id="title"/>
                    </div>
                    <!-- Liste des categories -->
                    <div class="m-8 flex flex-wrap gap-2">
                        <button v-for="category in categories " name="category_id" :key="category.id"
                            class="px-3 py-1.5 text-slate-700 bg-blue-100 focus:text-blue-50 text-sm font-medium text-center focus:bg-blue-400 pt-1.5 pb-2 rounded-lg border-2 border-blue-300 focus:border-blue-400">
                            {{ category.name }}
                        </button>
                    </div>
            
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="date" label="Date de l'activité"  id="date_activity"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="time" label="Heure de l'activité" id="hour"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="time" label="Durée de l'activité" id="duration"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="number" label="Nombre de participants" id="nb_max_participants"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Adresse"  id="adress"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Ville"  id="localisation"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Pays"  id="pays"/>
                    </div>
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="textarea" label="Description de l'activité" rows="10"  id="description"/>
                    </div>
                </template>
                <template #footer>
                    <div class="m-8">
                        <!-- <BtnPrimary :href="route('activites.store')" value="Creer"/> -->
                        <BtnCreate type="submit" value="Creer"/>
                    </div>
                </template>
            </FormSection>
        </template>
    </AppLayout>
</template>