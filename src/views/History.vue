<script setup>
import { computed,ref } from 'vue';

import Block from '@components/Bubbles/Block.vue';

import { timeAndDateFormatter } from '@utils/helpers';
import useFetch from '@utils/useFetch';

const history = ref();

history.value = await useFetch({ url: 'history' });

const sortedHistoryKeys = computed(() => Object.keys(history.value).sort((a, b) => b - a))
</script>

<template>
  <div class="mb-10 flex flex-col flex-wrap justify-evenly">
    <h1 class="mx-auto my-20 border-b-4 border-primary text-4xl font-bold">
      Purchase History
    </h1>
    <div
      v-for="key in sortedHistoryKeys"
      :key="key"
      class="mx-5 my-10"
    >
      <h3 class="text-2xl">
        {{ timeAndDateFormatter.format(key * 1000) }}
      </h3>
      <hr>
      <div class="flex flex-col gap-4">
        <template
          v-for="product in history[key]"
          :key="product.id"
        >
          <Block :product="product" />
        </template>
      </div>
    </div>
  </div>
</template>
