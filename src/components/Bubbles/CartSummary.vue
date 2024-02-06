<script setup>
const { total } = defineProps(['total']);

import { cart, clearCart } from '@utils/CartStore';
import { currencyFormatter } from '@utils/helpers';
import { successSnackBar } from '@utils/snackbars';
import useFetch from "@utils/useFetch"

const checkout = () => {
  const items = cart.cartItems.map(item => ({id: item.id, q: item.quantity}) )
  useFetch({ url: `checkout`, method: 'POST', body: {items} }).then(() => {
    clearCart();
    successSnackBar('Than you for shopping with us');
  })
};
</script>

<template>
  <div class="xs:mx-20 sm:mx-0 sm:w-[400px]">
    <div class="rounded-lg bg-base-strong p-6 shadow-md">
      <h2 class="mb-4 text-lg font-semibold">
        Summary
      </h2>

      <div
        v-for="(item, i) in cart?.cartItems"
        :key="item.id"
      >
        <hr
          v-if="i !== 0"
          class="border-secondaryText"
        >

        <div class="mb-4 flex items-center">
          <div class="flex-1">
            <h2 class="text-md font-bold">
              {{ item.name }}
            </h2>
            <div class="flex flex-row flex-wrap justify-between">
              <span
                v-if="item.quantity !== 1"
                class="text-secondaryText"
              >
                {{ currencyFormatter.format(item.price) }} x {{ item.quantity }}
              </span>
              <span v-else />
              <span class="text-secondaryText">{{ currencyFormatter.format(item.price * item.quantity) }}</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-2">
      <div class="mb-2 flex justify-between">
        <span class="font-semibold">Total</span>
        <span class="font-semibold">{{ currencyFormatter.format(total) }}</span>
      </div>
      <button
        class="button mt-4 w-full"
        @click="checkout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
