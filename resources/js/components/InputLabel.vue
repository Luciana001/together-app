<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    label: String,
    type: String,
    rows: Number,
    id: String,
});

const emit = defineEmits(['inputValue']);

// Récupérer la valeur et le name de l'input 
const saveInputValue = (event) => {
    let nameInput = event.target.name;
    let value = event.target.value;
    emit('inputValue', nameInput, value)
}
// recuperer le fichier image
const onFileChange = (event) => {
        const file = event.target.files[0];
        emit('inputValue', 'image', file);
    }

</script>

<template>
        <label class="block font-medium text-sm text-gray-700" :for="props.id">
            <span v-if="label">{{ label }}</span>
            <span v-else><slot /></span>
        </label>
        <!-- Input Textarea -->
        <textarea v-if="props.rows" :rows="props.rows" :id="props.id" :name="props.id" class=" rounded-lg border-none w-full" @blur="saveInputValue"></textarea>

        <!-- Input File -->
        <input v-else-if="props.type === 'file' " :type="props.type" :id="props.id" :name="props.id" class=""  @change="onFileChange"> 

        <!-- Other Input -->
        <input v-else :type="props.type" :id="props.id" :name="props.id" class=" rounded-lg border-none w-full" @blur="saveInputValue">

</template>
