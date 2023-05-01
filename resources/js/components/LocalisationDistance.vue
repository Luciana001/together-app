<script setup>
import { defineProps } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
    distance: Number,
    localisation: String
});
</script>

<template>
    <Icon :src="`../../img/icon/broche-de-localisation.png`" />
    <span class="text-emerald-500 font-medium mx-2">{{props.localisation}}, {{props.distance}} km</span>
</template>