<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        class: String,
        value: String,
    })
</script>
<template>
    <h2 :class="class">{{ props.value }}</h2>
    
</template>