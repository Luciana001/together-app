<script setup>
import { defineProps } from "vue";
import { format } from "date-fns";
import BtnPrimary from "./BtnPrimary.vue";
import Icon from "./Icon.vue";
import LocalisationDistance from "./LocalisationDistance.vue";
import LinkUser from "./LinkUser.vue";


const props = defineProps({
    data: Object,
});

const getImageUrl = (imageName) => {
        return `${window.location.origin}/storage/activites/${imageName}`;
    }
//console.log(asset('storage') + '/activites/' + props.data.images[0].name);
function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "d MMMM");
}
</script>

<template>
    
    <div class="w-60 shadow-gray-600 shadow-md m-1 rounded-lg">
        <!-- header => img + infos -->
        <div class="relative flex items-center h-40 overflow-hidden rounded-t-lg font-bold text-cyan-800">
            <img :src="getImageUrl(props.data.images[0].name)" alt="" class="object-cover" />

            <a href="" class="absolute top-4 left-4 bg-blue-50 py-1 px-2 rounded-lg">
                {{ props.data.category.name }}
            </a>
            <div class="absolute top-4 right-4 py-1 px-1.5 bg-blue-50 rounded-full">
                <icon :src="`./img/icon/bookmark.png`" class=""/>
            </div>
            <p class="absolute bottom-4 right-4 text-blue-50">
                {{ formatDate(props.data.date_activity) }}
            </p>
        </div>
        <!-- body => infos -->
        <div class="px-4 bg-cyan-800 font-medium rounded-b-lg">
            <h2 class="text-blue-50 pt-4 pb-2 text-base font-bold truncate">
                {{ props.data.title }}
            </h2>
            <!-- localisation -->
            <div class="flex py-0.5">
                <LocalisationDistance :distance="props.data.distance" :localisation="props.data.localisation" />
            </div>

            <!-- organisateur -->
            <div class="flex py-0.5 text-blue-50">
                <Icon :src="`./img/icon/utilisateur.png`"/>
                <LinkUser :value="props.data.user.name"/>

                <!-- Notes utilisateurs -->
                <Icon v-for="i in Math.floor(props.data.averageNote)" :src="`./img/icon/star.png`" :key="i" />
                <Icon v-for="i in Math.floor(5 - props.data.averageNote )" :src="`./img/icon/starWhite.png`" :key="i" />
            </div>

            <!-- participants -->
            <div class="flex py-0.5 text-blue-50">
                <Icon :src="`./img/icon/groupe.png`"/>
                <span  class="mx-2">1/{{ props.data.nb_max_participants }} Participant(s)</span>
            </div>
            <!-- footer => btn infos -->
            <div class="py-4 flex justify-center">
                <BtnPrimary value="Infos" :route="'/activities/' + props.data.id  +'?distance='+ props.data.distance"/>
            </div>
        </div>
    </div>
    
</template>
