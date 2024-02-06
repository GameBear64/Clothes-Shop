<script setup>
import { reactive, ref, watch } from 'vue';

import CheckBox from '@components/Form/CheckBox.vue';
import Input from '@components/Form/Input.vue';
import Range from '@components/Form/Range.vue';
import Icon from '@components/Icon.vue';

const { products } = defineProps(['products']);
const emit = defineEmits(['filtering'])

const defaultState = {
  search: '',
  tags: [],
  range: {
    min: 0,
    max: 0
  } 
}

const internalCount = ref(products.length)
const state = reactive(structuredClone(defaultState));

watch(state, () => {
  let filtered = products

  if(state?.search) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(state.search.toLowerCase()))
  }

  if (state.range?.min) {
    filtered = filtered.filter(item => item.price >= state.range?.min)
  }

  if (state.range?.max) {
    filtered = filtered.filter(item => item.price <= state.range?.max)
  }

  if (state.tags.length !== 0) {
    // double loop, oof
    filtered = filtered.filter(item => {
      const intersection = item.category.filter(value => state.tags.includes(value));      
      return intersection.length > 0
    })
  }

  internalCount.value = filtered.length

  emit('filtering', filtered)
})

const clearFilers = () => {
  Object.assign(state, structuredClone(defaultState));
}
</script>

<template>
  <div class="sticky top-5 rounded-lg bg-base-strong p-6 shadow-md">
    <Input
      v-model="state.search"
      placeholder="Search"
    />

    <hr>
    <Range
      v-model:min="state.range.min"
      v-model:max="state.range.max"
      label="Price range"
    />

    <hr class="mb-5">
    <CheckBox
      v-model="state.tags"
      value="men"
      label="Men"
    />
    <CheckBox
      v-model="state.tags"
      value="women"
      label="Women"
    />
    <CheckBox
      v-model="state.tags"
      value="top"
      label="Tops"
    />
    <CheckBox
      v-model="state.tags"
      value="shirt"
      label="Shirts"
    />
    <CheckBox
      v-model="state.tags"
      value="pants"
      label="Pants"
    />
    <CheckBox
      v-model="state.tags"
      value="skirt"
      label="Skirts"
    />

    <hr>
    <div class="flex justify-between">
      <p class="text-secondaryText">
        {{ internalCount }} products
      </p>
      <Icon
        icon="delete_forever"
        clickable
        @click="clearFilers"
      />
    </div>
  </div>
</template>