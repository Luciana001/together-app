<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";
import ListCategories from '../components/ListCategories.vue';
import HamburgerMenu from "../components/HamburgerMenu.vue";
import FormSearch from "../components/FormSearch.vue";
import ArrowRight from "../components/ArrowRight.vue";
import SectionCardFloat from "../components/SectionCardFloat.vue";
import { useLocationStore } from "@/stores/locationStore";
import { useActivitiesStore } from "@/stores/activitiesStore";
import axios from "axios";

// ---------- Activités ----------
// Recuperer par le biais des stores les activites en fonction de:
// de la distance qui les séparent
// de la position actuelle de l'utilisateur

const locationStore = useLocationStore();
const activitiesStore = useActivitiesStore();

// récupérer la position actuelle de l'utilisateur et les activités triées par distance et par date
async function fetchActivities() {
    await locationStore.fetchPosition();
    await activitiesStore.fetchActivities();
}

// Récupérer la liste des catégories
let categories = ref([])
onMounted(() => {
    fetchActivities();
    axios.get('/api/categories')
        .then(response => categories.value = response.data)
        .catch(error => console.log(error));
});

// Insérer les activités triées par distance croissante et par date dans nearesActivities
const nearesActivities = computed(
    () => activitiesStore.getActivitiesSortedByDistance
);

// Insérer les activités triées par date dans nextActivities
const nextActivities = computed(
    () => activitiesStore.getActivitiesSortedByDate
);

</script>

<template>
    <AppLayout title="Dashboard" class="bg-gradient-to-b from-teal to-cyan">
        <!-- Navbar -->
        <template #nav>
            <div class="mx-auto px-4">
                <div class="flex justify-between ">
                    <div class="bg-transparent pt-10">
                        <h1 class="text-blue-50 font-extrabold text-4xl pl-2">
                            <a :href="route('dashboard')">Together</a>
                        </h1>
                    </div>


                    <HamburgerMenu />
                </div>
            </div>
        </template>

        <template #header>
            <!-- Formulaire de recherche -->
            <div class="mx-auto px-4">
                <!-- Search Activities by name, filter, map-->
                <FormSearch />

                <!-- Liste des catégories -->
                <div class="relative">
                    <div class=" overflow-auto flex -mx-8 px-8">
                        <ul v-for="categorie in categories" class="mx-2">
                            <ListCategories :data="categorie" />
                        </ul>
                        <!-- Fleches droite -->
                        <ArrowRight class="p-2 h-8 w-8 top-4 right-0" />
                    </div>
                </div>
            </div>

        </template>

        <template #main>
            <!-- Activités triées par distance -->
            <SectionCardFloat title="Activités à proximité" :data="nearesActivities" />

            <!-- Activités triées par date -->
            <SectionCardFloat title="Activités à venir" :data="nextActivities" />
        </template>

    </AppLayout>
</template>
