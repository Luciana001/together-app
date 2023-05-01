<script setup>
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'

// ---------- Menu de navigation ----------
const showingNavigationDropdown = ref(false);

// const switchToTeam = (team) => {
//     router.put(route('current-team.update'), {
//         team_id: team.id,
//     }, {
//         preserveState: false,
//     });
// };

const logout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <div class="hamburger">
        <!-- Hamburger -->
        <div class="-mr-2 flex items-center pt-10">
            <button
                class="inline-flex items-center justify-center pr-4 rounded-md text-blue-50 hover:text-cyan-800 focus:outline-none focus:text-cyan-800 transition duration-150 ease-in-out"
                @click="showingNavigationDropdown = !showingNavigationDropdown">
                <svg class="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path :class="{ 'hidden': showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path :class="{ 'hidden': !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Responsive Navigation Menu -->
        <div :class="{ 'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown }" class=" bg-blue-50">
            <div class="pt-2 pb-3 space-y-1">
                <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                    Together
                </ResponsiveNavLink>
                <ResponsiveNavLink :href="route('addForm')" :active="route().current('addForm')">
                    Add new activity
                </ResponsiveNavLink>
            </div>

            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t border-gray-200">
                <div class="flex items-center px-4">
                    <div v-if="$page.props.jetstream.managesProfilePhotos" class="shrink-0 mr-3">
                        <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.auth.user.profile_photo_url"
                            :alt="$page.props.auth.user.name">
                    </div>

                    <div>
                        <div class="font-medium text-base text-gray-800">
                            {{ $page.props.auth.user.name }}
                        </div>
                        <div class="font-medium text-sm text-gray-500">
                            {{ $page.props.auth.user.email }}
                        </div>
                    </div>
                </div>

                <div class="mt-3 space-y-1">
                    <ResponsiveNavLink :href="route('profile.show')" :active="route().current('profile.show')">
                        Profile
                    </ResponsiveNavLink>

                    <!-- Authentication -->
                    <form method="POST" @submit.prevent="logout">
                        <ResponsiveNavLink as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>