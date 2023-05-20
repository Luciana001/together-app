<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AppLayout from "../Layouts/AppLayout.vue";
import SecondaryNavigation from "../components/SecondaryNavigation.vue";
import TitleSection from "../components/TitleSection.vue";
import InputLabel from "../components/InputLabel.vue";
import FormSection from "../components/FormSection.vue";
import { router } from '@inertiajs/vue3';
import BtnPrimary from "../components/BtnPrimary.vue";
import BtnCreate from "../components/BtnCreate.vue";

// Récupérer la liste des catégories
let categories = ref({});
onMounted(() => {
    axios
        .get("/api/categories")
        .then((response) => (categories.value = response.data))
        .catch((error) => console.log(error));
});

const activity = ref({
    title: null,
    date_activity: null,
    hour: null,
    duration: null,
    adress: null,
    localisation: null,
    description: null,
    nb_max_participants: null,
    pays: null,
    image: null,
    category_id: null,
});

const submitForm = () => {
    router.post('/activities', activity.value);
}

// construire le tableau activity avec les valeurs du formulaire
const saveValueInput = (name, value) => {
    activity.value[name] = value;
}

</script>

<template>
    <AppLayout title="addForm" class="bg-blue-50">
        <template #nav>
            <SecondaryNavigation class="bg-teal" />
        </template>

        <template #header>
            <div class="mx-8 pt-16">
                <TitleSection class="font-extrabold text-gray-700 py-6 text-xl" value="Créer une nouvelle activité" />
            </div>
        </template>

        <template #main>
            <FormSection @submit.prevent="submitForm" enctype="multipart/form-data">
                
                <template #header>
                    <!-- Input Image -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="file" label="Choisir une image" id="image"
                            name="image" />
                    </div>
                </template>
                <template #main>
                    <!-- Input Titre -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Titre de l'activité" id="title" />
                    </div>
                    <!-- Liste des categories -->
                    <div class=" m-8 flex flex-wrap gap-2">
                        <div v-for="category in categories" :key="category.id" class="mx-0.5 my-1">
                            <input v-model="activity['category_id']" 
                                type="radio" 
                                :id="'category-' + category.id"
                                :value="category.id" 
                                class="hidden"
                            >
                            <label :for="'category-' + category.id"
                                class="p-3 py-1.5 text-slate-700 bg-blue-100 text-sm font-medium text-center pt-1.5 pb-2 rounded-lg border-2 border-blue-300 cursor-pointer"
                                :class="{ 'focus:border-blue-400 text-blue-50 bg-blue-400': activity['category_id'] === category.id }">
                                {{ category.name }}
                            </label>
                        </div>
                    </div> 

                    <!-- Input date activité -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="date" label="Date de l'activité"
                            id="date_activity" />
                    </div>

                    <!-- Input Heure activité -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="time" label="Heure de l'activité" id="hour" />
                    </div>

                    <!-- Input durée -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="time" label="Durée de l'activité" id="duration" />
                    </div>

                    <!-- Input participants -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="number" label="Nombre de participants"
                            id="nb_max_participants" />
                    </div>

                    <!-- Input adresse -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Adresse" id="adress" />
                    </div>

                    <!-- Input localisation -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Ville" id="localisation" />
                    </div>

                    <!-- Input pays -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="text" label="Pays" id="pays" />
                    </div>

                    <!-- Input description -->
                    <div class="m-8">
                        <InputLabel @inputValue="saveValueInput" type="textarea" label="Description de l'activité" rows="10"
                            id="description" />
                    </div>
                </template>
                <template #footer>
                    <div class="m-8">
                        <button type="submit" >Créer</button>
                    </div>
                </template>
            </FormSection>
        </template>
    </AppLayout>
</template>
<style>
    input[type="radio"]:focus + label {
        outline: 2px solid blue;
    }
</style>