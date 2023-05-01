<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome"/>

    <div class=" h-full text-blue-50 text-center align-middle font-semibold">
        <h1 class=" text-3xl font-bold pb-3 ">
            <a href="index.html">Together</a>
        </H1>
        <div v-if="canLogin" class="sm:flex sm:justify-center sm:items-center">
            <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="hover:text-gray-600 ">Dashboard</Link>

            <template v-else>
                <Link :href="route('login')">
                    <span class="hover:text-gray-600 ">Log in </span>
                    <span>|</span>
                </Link>
                <Link v-if="canRegister" :href="route('register')" class="hover:text-gray-600 ">
                    Register
                </Link>
            </template>
        </div>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
