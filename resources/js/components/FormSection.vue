<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    action: String,
    method: String,
})
const emit = defineEmits(['submitted']);


</script>

<template>
    <form :action="props.action" :method="props.method">
        <slot name="header" />
        <slot name="main" />
        <slot name="footer" />
    </form>
</template>
