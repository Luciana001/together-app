<script setup>
import {defineProps} from 'vue'

const props = defineProps({
    route: String,
    src: String,
    class: String,
})
</script>


<template>
    <a :href="props.route">
        <img :src="`/img/icon/${props.src}`" alt="" :class="props.class">
    </a>
</template>

