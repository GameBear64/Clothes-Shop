<script setup>
const { icon, full, dense, clickable } = defineProps({
  icon: String,
  full: Boolean,
  dense: Boolean,
  clickable: Boolean,
});
</script>

<template>
  <span
    :style="{ fontVariationSettings: `'FILL' ${full ? 1 : 0}`, letterSpacing: dense ? '-0.2em' : '0' }"
    :class="`material-symbols-rounded align-sub ${clickable ? 'cursor-pointer' : ''}`"
    v-bind="$attrs"
  >
    {{ icon }}
  </span>
</template>
