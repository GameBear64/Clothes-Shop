<script setup>
const { images } = defineProps(['images']);
</script>

<template>
  <div class="flex items-center">
    <swiper-container
      :centered-slides="true"
      :space-between="10"
      :navigation="true"
      thumbs-swiper=".my-thumbs"
    >
      <template v-for="image in images">
        <swiper-slide class="flex justify-center">
          <img
            :src="`http://localhost:3030/image/${image}`"
            class="aspect-square object-scale-down"
          >
        </swiper-slide>
      </template>
    </swiper-container>
  </div>
  <hr className="border-gray-200">
  <swiper-container
    class="my-thumbs"
    :centered-slides="true"
    :space-between="15"
    :slides-per-view="5"
  >
    <template v-for="image in images">
      <swiper-slide>
        <img
          :src="`http://localhost:3030/image/${image}?size=200`"
          class="aspect-square cursor-pointer object-cover"
        >
      </swiper-slide>
    </template>
  </swiper-container>
</template>
