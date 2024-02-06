<script setup>
const { product } = defineProps(['product']);
</script>

<template>
  <div class="m-5 h-fit w-72 overflow-hidden rounded-lg bg-base-strong shadow-md duration-300 hover:scale-105 hover:shadow-lg">
    <img
      class="h-48 w-full object-cover object-center"
      :src="`http://localhost:3030/image/${product.image[0]}?size=300`"
      alt="Product Image"
    >
    <div class="p-4">
      <router-link :to="`/product/${product.id}`">
        <h2 class="mb-2 overflow-hidden whitespace-nowrap text-lg font-medium text-primaryText">
          {{ product.name }}
        </h2>
      </router-link>
      <div class="flex items-center">
        <p class="mr-2 text-lg font-semibold text-primaryText">
          ${{ product.price }}
        </p>
      </div>
    </div>
  </div>
</template>
