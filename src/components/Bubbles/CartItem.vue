<script setup>
const { item } = defineProps(['item']);
import { addToCart, removeFromCart } from '@utils/CartStore';
import { currencyFormatter } from '@utils/helpers';
</script>

<template>
  <div class="flex flex-row flex-wrap justify-center gap-5 rounded-lg bg-base-strong p-5 shadow-md md:flex-nowrap md:justify-between">
    <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-0">
      <img
        class="mr-4 aspect-square size-28 object-cover"
        :src="`http://localhost:3030/image/${item.image[0]}?size=120`"
        alt="Product image"
      >
      <div class="flex flex-col">
        <span class="font-semibold">{{ item.name }}</span>
        <div class="flex items-center">
          {{ currencyFormatter.format(item.price * item.quantity) }}
        </div>
      </div>
    </div>
    <div class="flex h-20 items-center py-4">
      <button
        class="reject-button h-full rounded-r-none"
        @click="() => removeFromCart(item.id)"
      >
        -
      </button>
      <span class="flex h-full items-center justify-center border-y-2 border-base-moderate bg-base px-4">
        {{ item.quantity }}
      </span>
      <button
        class="agree-button h-full rounded-l-none"
        @click="() => addToCart(item)"
      >
        +
      </button>
    </div>
  </div>
</template>
