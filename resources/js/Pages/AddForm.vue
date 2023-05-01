<script setup>
import AppLayout from '../Layouts/AppLayout.vue';
import SecondaryNavigation from '../components/SecondaryNavigation.vue';
import LinkIcon from '../components/LinkIcon.vue';
</script>

<template>
    <AppLayout title="addForm" class="bg-blue-50">
        <template #nav>
            <!-- <SecondaryNavigation class="bg-teal"/> -->
            <div class="absolute top-0 left-0 right-0 z-50">
                <div class="flex justify-between opacity-50 bg-teal">
                    <LinkIcon icon="fleche.png" :route="route('dashboard')" class="pl-4 pt-4"/>
        
                    <LinkIcon icon="signet.png" :route="route('dashboard')" class="p-2 my-3 w-8 h-8 bg-blue-50 rounded-full" />
                </div>
            </div>
        </template>
        <template #header></template>
        <template #main></template>
    </AppLayout>
</template>