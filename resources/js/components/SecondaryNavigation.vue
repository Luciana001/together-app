<script setup>
import LinkIcon from './LinkIcon.vue';
import { defineProps } from 'vue';

const props = defineProps({
    class: String,
})
</script>
<template>
    <!-- Navigation -->
    <div class="mx-auto px-4 relative">
        <div class="absolute top-0 left-0 right-0 z-50 ">
            <div class="flex justify-between opacity-50 bg-gray-700">
                <LinkIcon src="fleche.png" :route="route('dashboard')" class="pl-4 pt-4" />
                <div class="flex gap-4 mr-5">
                    <LinkIcon src="signet.png" :route="route('dashboard')"
                        class="p-2 my-3 w-8 h-8 bg-blue-50 rounded-full" />
                    <LinkIcon src="editer.png" :route="route('dashboard')"
                        class="p-2 my-3 w-8 h-8 bg-blue-50 rounded-full" />
                </div>
            </div>
        </div>
    </div>
</template>