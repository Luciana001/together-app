<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    value: String,
    route: String,
})
</script>

<template>
    <a :href="props.route" class="bg-emerald-500 text-blue-50 py-2 px-10 rounded-full" >{{ props.value }}</a>
</template>