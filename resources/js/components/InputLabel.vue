<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    label: String,
    type: String,
    rows: Number,
    id: String,
});

// const emit = defineEmits(['inputValue']);

// const value = ref('');

// const updateValue = (event) => {
//     value.value = event.target.value,
//     emitValue(event.target.name);
// }

// const emitValue = (name) => {
//     const payLoad = { name: name, value : value.value };
//     emit('inputValue', payLoad)
// }

</script>

<template>
    <label class="block font-medium text-sm text-gray-700" :for="props.id">
        <span v-if="label">{{ label }}</span>
        <span v-else><slot /></span>
    </label>
    <!-- Input Textarea -->
    <textarea v-if="props.rows" :rows="props.rows" :id="props.id" :name="props.id" class="rounded-lg border-none w-full" @blur="updateValue"></textarea>

    <!-- Input File -->
    <input v-else-if="props.type === 'file' " :type="props.type" :id="props.id" :name="props.id" @blur="updateValue"> 

    <!-- Other Input -->
    <input v-else :type="props.type" :id="props.id" :name="props.id" class="rounded-lg border-none w-full" @blur="updateValue">
</template>
