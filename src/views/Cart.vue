<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import CartItem from '@components/Bubbles/CartItem.vue';
import CartSummary from '@components/Bubbles/CartSummary.vue';

import { cart } from '@utils/CartStore';

const router = useRouter();

const total = computed(() => cart.cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0));
</script>

<template>
  <div
    v-if="cart.cartItems?.length > 0"
    class="flex w-screen flex-col gap-10 p-2 xs:p-10 sm:flex-row"
  >
    <div class="w-full">
      <h1 class="mb-4 text-2xl font-semibold">
        Shopping Cart
      </h1>
      <div class="flex flex-col gap-8">
        <CartItem
          v-for="item in cart?.cartItems"
          :item="item"
        />
      </div>
    </div>
    <CartSummary :total="total" />
  </div>
  <div
    v-else
    class="flex h-full flex-col items-center justify-center"
  >
    <p class="my-5 text-2xl font-semibold">
      No items in cart
    </p>
    <button
      class="button"
      @click="() => router.push('/')"
    >
      Go shop
    </button>
  </div>
</template>
