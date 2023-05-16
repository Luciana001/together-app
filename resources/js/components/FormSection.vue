<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    action: String,
    method: String,
    enctype: String,
})
// const emit = defineEmits(['submitted']);

// token = MMzsmbfLZlB1IhEHziQkiiVUS1xkU7GfELcQzptn
</script>

<template>
    <form :enctype="props.enctype" :method="props.method" :action="props.action">
       
        <!-- <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}"> -->
        <slot name="header" />
        <slot name="main" />
        <slot name="footer" />
        
    </form>
</template>
