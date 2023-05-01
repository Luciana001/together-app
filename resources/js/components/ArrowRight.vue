<script setup>
import {defineProps} from 'vue'

const props = defineProps({
    class: String,
})
</script>

<template>
    <div class="absolute bg-gray-400 opacity-70 rounded-full " :class="props.class">
        <button>
            <img :src="`./img/icon/double_arrow_right.png`" class="object-center" />
        </button>
    </div>
</template>