<script setup>
import { defineProps } from 'vue';
import Icon from './Icon.vue';

const props = defineProps({
    href: String,
    value: String,
});
</script>

<template>
    <a :href="props.href" class="mx-2">{{ props.value }}</a>
</template>