<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        src: String,
        class: String,
    },
});
</script>

<template>
    <img :src="props.src" :class="props.class" alt="" class="object-cover rounded-full my-4">
</template>