<script setup>
import { defineProps } from 'vue';
import CardActivity from  "./CardActivity.vue";
import ArrowRight from "./ArrowRight.vue";
import TitleSection from './TitleSection.vue';

const props = defineProps({
    title: String,
    data: Array,
})
</script>

<template>
    <section class="py-6 relative">
        <TitleSection class="font-extrabold text-blue-50 py-6 text-xl" :value="props.title"/>
        <!-- <h2 class="font-extrabold text-blue-50 py-6 text-xl">{{ props.title }}</h2> -->
            <div class="overflow-auto flex">
                <!-- Card activity -->
                <article v-for="activity in props.data" class="mr-1">
                    
                    <CardActivity :data="activity" />
                </article>
            </div>
                
            <ArrowRight class="top-1/2 right-0 p-2 h-14 w-14" />
    </section>
</template>