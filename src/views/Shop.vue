<script setup>
import { ref } from 'vue';

import Card from '@components/Bubbles/Card.vue';
import Filter from '@components/Bubbles/Filter.vue';

import useFetch from '@utils/useFetch';

const products = ref();
const filteredProducts = ref(products);

products.value = await useFetch({ url: 'products' });

</script>

<template>
  <div class="my-20 flex flex-wrap">
    <div class="flex flex-col sm:flex-row ">
      <div class="relative mx-2 xs:mx-16 sm:mx-5 sm:w-[250px]">
        <Filter
          :products="products"
          @filtering="(newProducts) => filteredProducts = newProducts"
        />
      </div>
      <div
        v-if="filteredProducts.length"
        class="flex flex-1 flex-wrap justify-evenly"
      >
        <template
          v-for="product in filteredProducts"
        >
          <Card :product="product" />
        </template>
      </div>
      <div
        v-else
        class="flex-1"
      >
        No products found.
      </div>
    </div>
  </div>
</template>
