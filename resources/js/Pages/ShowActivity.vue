<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        activity: Object,
    })
    console.table(props.activity)
</script>

<template>
<h1>{{ props.activity[0].activityTitle }}</h1>
</template>