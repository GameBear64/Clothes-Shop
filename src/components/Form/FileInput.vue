<script setup>
import { readFile } from '@utils/utils';

import Icon from '../Icon.vue';

const props = defineProps(['label', 'class', 'error', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const processImage = async image => {
  if (!image) return emit('update:modelValue', '');

  const base64Image = await readFile(image);
  emit('update:modelValue', base64Image);
};
</script>

<template>
  <div>
    <div class="my-2 rounded-xl border-2 border-dashed border-primary">
      <div
        v-if="!!modelValue"
        class="relative flex w-full flex-col items-center p-2"
      >
        <img
          class="max-h-40"
          :src="`data:image/png;base64,${modelValue}`"
          alt=""
        >
        <Icon
          class="absolute right-1 top-1 cursor-pointer rounded-lg bg-gray-400 text-black"
          icon="close"
          @click.prevent="() => processImage()"
        />
      </div>
      <label
        v-else
        :for="props.label?.toLowerCase().replace(/ /g, '-')"
        class="flex w-full cursor-pointer flex-col items-center p-6 text-center text-primaryText"
        :class="props.class"
      >
        <p class="text-xl font-medium tracking-wide">{{ props.label }}</p>
        <input
          :id="props.label?.toLowerCase().replace(/ /g, '-')"
          :name="props.label"
          v-bind="$attrs"
          type="file"
          class="hidden"
          @change="event => processImage(event.target.files[0])"
        >
      </label>
    </div>
    <p
      v-if="props.error"
      class="text-sm font-light text-red-500"
    >
      {{ props.error }}
    </p>
    <div
      v-else
      class="h-5"
    />
  </div>
</template>
