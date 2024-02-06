<script setup>
const { product } = defineProps(['product']);

</script>

<template>
  <div class="flex flex-row justify-between rounded-lg bg-base-strong p-5 shadow-md">
    <div class="flex items-center">
      <img
        class="mr-4 aspect-square size-28 object-cover"
        :src="`http://localhost:3030/image/${product.image[0]}?size=120`"
        alt="Product image"
      >
      <div class="flex flex-col">
        <router-link :to="`/product/${product.id}`">
          <span class="font-semibold text-primaryText">{{ product.name }}</span>
        </router-link>
        <div
          v-if="product?.quantity && product?.quantity !== 1"
          class="flex items-center text-secondaryText"
        >
          {{ product.price }}$ x {{ product.quantity }}
        </div>
        <div
          v-else
          class="flex items-center"
        >
          {{ product.price }}$
        </div>
      </div>
    </div>
  </div>
</template>
