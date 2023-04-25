<script setup>
    import { computed, defineProps, onMounted } from 'vue';
    import AppLayout from '@/Layouts/AppLayout.vue';
    import Welcome from '../components/Welcome.vue';
    import { locationStore } from "../stores/locationStore";
    import { activitiesStore } from "../stores/activitiesStore"

    // const props = defineProps({
    //     activities: Array,
    // });
    // console.table(props.activities)
    async function fetchActivities() {
        await locationStore.fetchPosition();
        await activitiesStore.fetchActivities();
    }

    onMounted(fetchActivities);

    const nearesActivities = computed(() => activitiesStore.getActivitiesSortedByDistance);
    const nextActivities = computed(() => activitiesStore.getActivitiesSorted>ByDate);

    console.table(nearesActivities)
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <Welcome :nearesActivities="nearesActivities" :nextActivities="nextActivities"/> 
                    
                    
                </div>
            </div>
        </div>
    </AppLayout>
</template>
