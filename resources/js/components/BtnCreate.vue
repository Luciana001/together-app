<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    value: String,
    type: String,
})

const emits = defineEmits(['onClick'])
</script>

<template>
    <button @click="$emit('onClick')" :type="props.type" class="rounded-full bg-teal font-medium text-blue-50 px-4 py-2">
        {{ props.value }}
    </button>
</template>