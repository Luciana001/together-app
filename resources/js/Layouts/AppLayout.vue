<script setup>
import { ref, defineProps } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import LinkIcon from '../components/LinkIcon.vue';

const props = defineProps({
    title: String,
    bgBody: String,
});


</script>

<template>
    <div>

        <Head :title="title" />

        <Banner />

        <div class="min-h-screen" :class="props.bgBody">
            <!-- Navigation -->
            <nav>
                <!-- Primary Navigation Menu -->
                <slot name="nav" />
            </nav>

            <!-- Page Heading -->
            <header v-if="$slots.header" class="">
                <div class="">
                    <slot name="header" />
                    
                </div>
            </header>

            <!-- Page Content -->
            <main class="pl-4">

                <slot name="main" />
            </main>

            <footer class="relative bg-blue-50 bottom-0 left-0 right-0 h-12">
                <div class=" grid grid-cols-4 grid-rows-1 border-gray-900 ">
                    <LinkIcon :route="route('dashboard')" class="h-4 w-4 my-4 mx-auto" src="home.png"/>
                    <LinkIcon :route="route('dashboard')" class="h-4 w-4 my-4 mx-auto" src="user_border.png"/>
                    <LinkIcon :route="route('dashboard')" class="h-4 w-4 my-4 mx-auto" src="bookmark.png"/>
                    <LinkIcon :route="route('dashboard')" class="h-4 w-4 my-4 mx-auto" src="settings.png"/>
                </div>  
            </footer>
        </div>
    </div>
</template>
