<script setup>
const { override } = defineProps(['override']);
</script>

<template>
  <button
    type="submit"
    :class="`${override ? override : 'button m-auto mt-2 w-52 flex justify-center'}`"
  >
    <slot />
  </button>
</template>
