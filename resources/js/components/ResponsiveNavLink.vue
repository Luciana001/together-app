<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    active: Boolean,
    href: String,
    as: String,
});

console.log(props.active)
const classes = computed(() => {
    return props.active
        ? 'w-full text-left text-base font-medium block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out border-cyan-800 text-cyan-700 bg-cyan-50 focus:outline-none focus:text-cyan-800 focus:bg-cyan-100 focus:border-cyan-700 '
        : 'w-full text-left text-base font-medium block pl-3 pr-4 py-2 border-l-4 transition duration-150 ease-in-out border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 ';
});

const test = computed(() => {
    console.log(props.active);
})
</script>

<template>
    <div>
        <button v-if="as==='button'" :class="classes">
            <slot />
        </button>

        <Link v-else :href="href" :class="classes">
            <slot />
        </Link>
    </div>
</template>
