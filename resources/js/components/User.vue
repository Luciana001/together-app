<script setup lang="ts">
    import {useUserStore} from '../stores/userStore';

    const userDatas = useUserStore();

</script>

<template>
    <div>
        <h2>Coucou {{ userDatas.firstName }}</h2>
    </div>
</template>