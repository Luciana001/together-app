<script setup>
import LinkIcon from '../components/LinkIcon.vue'
</script>

<template>
    <form action="">
        <div class="flex py-2">
            <!-- Input search -->
            <div class="relative my-6 w-3/4">
                <input type="search"
                    class="w-full bg-cyan-800 opacity-60 rounded-xl text-xs pb-2 pl-8 text-blue-50 border-none"
                    value="Chercher des activités" />
                <img :src="`./img/icon/search.png`" alt="" class="w-4 h-4 absolute left-2 top-2" />
            </div>

            <!-- filter and map-->
            <div class="flex gap-4 m-6">
                <LinkIcon :route="route('dashboard')" class="h-6 mt-1" icon="filter-filled-tool-symbol" />
                <LinkIcon :route="route('dashboard')" class="h-6 mt-1" icon="carte" />
            </div>
        </div>
    </form>
</template>