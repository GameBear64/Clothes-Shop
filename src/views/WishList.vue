<script setup>
import { ref } from 'vue';

import Block from '@components/Bubbles/Block.vue';

import useFetch from '@utils/useFetch';

const products = ref();

products.value = await useFetch({ url: 'wishlist' });
</script>

<template>
  <div class="mb-10 flex flex-col flex-wrap justify-evenly">
    <h1 class="mx-auto my-20 border-b-4 border-primary text-4xl font-bold">
      Wish List
    </h1>
    <div class="mx-auto flex w-2/3 flex-col flex-wrap justify-evenly gap-5">
      <Block
        v-for="product in products"
        :product="product"
      />
    </div>
  </div>
</template>
