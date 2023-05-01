<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    src: String,
    class: String,
})

</script>

<template>
    <img :src="props.src" alt="" class="h-4 w-4 mt-1" :class="props.class" />
</template>