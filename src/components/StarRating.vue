<script setup>
const { rating } = defineProps({
  rating: Number,
});

import { computed } from 'vue';

import Icon from './Icon.vue';

const fullStars = computed(() => Array.from({ length: Math.round(rating) }, (_, i) => i + 1));
const hollowStars = computed(() => Array.from({ length: 5 - Math.round(rating) }, (_, i) => i + 1));
</script>

<template>
  <div class="flex items-center text-yellow-500">
    <Icon
      v-for="_i in fullStars"
      icon="star"
      full
      dense
    />
    <Icon
      v-for="_i in hollowStars"
      icon="star"
      dense
    />
  </div>
</template>
