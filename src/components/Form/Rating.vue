<script setup>
import { computed, ref } from 'vue';
const { rating, error } = defineProps({
  rating: Number,
  error: String,
});
const emit = defineEmits(['update:rating']);

import Icon from '../Icon.vue';

let internal = ref(rating || 0);

const fullStars = computed(() => Array.from({ length: Math.round(internal.value) }, (_, i) => i + 1));
const hollowStars = computed(() => Array.from({ length: 5 - Math.round(internal.value) }, (_, i) => i + 1));
</script>

<template>
  <div>
    <div
      class="flex items-center text-yellow-500"
      @mouseleave="internal = rating"
    >
      <Icon
        v-for="i in fullStars"
        class="text-3xl"
        icon="star"
        clickable
        full
        @mouseenter="internal = i"
        @click="emit('update:rating', i)"
      />
      <Icon
        v-for="i in hollowStars"
        class="text-3xl"
        icon="star"
        clickable
        @mouseenter="internal = i + fullStars.length"
        @click="emit('update:rating', i + fullStars.length)"
      />
    </div>
    <p
      v-if="error"
      class="text-sm font-light text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>
