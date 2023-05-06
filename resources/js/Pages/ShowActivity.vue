<script setup>
import { defineProps } from 'vue';
import {format} from "date-fns";
import AppLayout from "@/Layouts/AppLayout.vue";
import Icon from '../components/Icon.vue';
import SecondaryNavigation from '../components/SecondaryNavigation.vue';
import BtnPrimary from '../components/BtnPrimary.vue';
import ImgRounded from '../components/ImgRounded.vue';
import LocalisationDistance from '../components/LocalisationDistance.vue';
import LinkUser from '../components/LinkUser.vue';

const props = defineProps({
    activity: Array,
    distance: Number,
})

function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "d MMMM");
}

function formatHeure(heure){
    let [hours, minutes, seconds] = heure.split(':')
    return `${hours}h${minutes}`
}

</script>

<template>
    <AppLayout title="ShowActivity" class="bg-gradient-to-b from-teal to-cyan">

        <template #nav>
            <!-- Navigation -->
            <SecondaryNavigation class="bg-teal"/>
            
        </template>

        <template #header>
            <div class="relative h-96">
                <img :src="`../../img/activites/${props.activity[0].images[0].name}`" alt="" class="object-cover h-96 w-full">

                <!-- Infos of activity -->
                <!-- Title -->
                <h2 class="absolute bottom-12 left-4 text-blue-50 pt-4 pb-2 text-lg font-bold truncate">
                    {{ props.activity[0].title }}
                </h2>

                <!-- Localisation -->
                <div class="flex py-0.5 absolute bottom-4 left-4 bg-green-50 rounded-lg p-2">
                    <LocalisationDistance :distance="props.distance" :localisation="props.activity[0].localisation" />
                </div>

                <!-- Date & category -->
                <div class="px-5 py-3 flex justify-between bg-cyan-800 font-medium ">
                    <span class=" text-blue-50 font-extrabold pt-1">
                        {{ formatDate(props.activity[0].date_activity) }}
                    </span>
                    <a href="" class=" bg-blue-50 text-cyan-800 font-extrabold py-1 px-2 rounded-lg">
                        {{ props.activity[0].category.name }}
                    </a>
                </div>
            </div>
        </template>

        <template #main>
            <div class="px-2 pt-12">
                <article class= "text-blue-50 font-medium"> 

                    <!-- Titre -->
                    <h2 class="font-bold text-lg mt-12 mb-4">{{ props.activity[0].title }}</h2>

                    <!-- Date -->
                    <span class="">
                        {{ formatDate(props.activity[0].date_activity) }}, 
                        à {{formatHeure(props.activity[0].hour)}}
                    </span>

                    <!-- Description -->
                    <p class="mt-4">{{props.activity[0].description}}</p>

                    <!-- Adress -->
                    <div class="mt-12 flex gap-4 text-sm">
                        <Icon :src="`../../img/icon/pointeur-de-localisation.png`" class="w-10 h-8 mt-1"/>
                        <p class="w-1/2">
                            {{props.activity[0].adress}}
                        </p>
                    </div>
                </article>

                <!-- Organisateur et participants -->
                <section class=" mt-12 text-blue-50 font-medium">
                    <span class="">Organisé par</span>

                    <ImgRounded :src="`../../img/users/${props.activity[0].user.profile_photo_path}`" class="w-16 h-16"/>
                    <LinkUser :value="props.activity[0].user.name"/>

                    <!-- Notes utilisateurs -->
                    <div class="flex gap-1 mb-12">
                        
                        <Icon v-for="i in Math.min(props.activity[0].average, 5)" :src="`../../img/icon/star.png`" :key="i"/>
                        <Icon v-for="i in 5 - props.activity[0].average" :src="`../../img/icon/starWhite.png`" :key="i"/>
                    </div>

                    <!-- Nb de participants inscris sur le nombre de participants acceptés -->
                    <span class="font-normal">{{props.activity[0].users.length}}/{{props.activity[0].nb_max_participants}} participants</span>

                    <div class="grid grid-cols-6 grid-flow-row">
                        <div v-for="user in props.activity[0].users" class="inline-block ">
                            <ImgRounded :src="`../../img/users/${user.profile_photo_path}`" class="w-12 h-12"/>                         
                        </div>
                        
                    </div>

                    <!-- Inscription -->
                    <div class="py-6 mb-16">
                        <BtnPrimary value="S'inscrire"/>
                    </div>
                </section>
            </div>
        </template>

    </AppLayout>
    
</template>