<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { defineProps } from "vue";


const props = defineProps({
    data: Object,
});
</script>

<template>
    <!-- Liste des catégories -->
    <li class="inline-block shadow-gray-600 shadow-xl rounded-full w-16 h-16 ">
        <a href="">
            <img :src="`./img/categories/${data.image}`" alt="" class="w-full h-full object-cover rounded-full" />
            <span class="font-medium text-sm text-blue-50">{{
                data.name
            }}</span>
        </a>
    </li>

    
</template>
