<script setup>
import Icon from '@components/Icon.vue';

import { themes } from '@utils/ThemeStore.js';

const changeThemeMode = mode => {
  localStorage.setItem('theme-mode', mode);
  themes.mode = mode;
};

const changeThemeColor = color => {
  localStorage.setItem('theme-color', color);
  themes.color = color;
};
</script>

<template>
  <h2 class="mt-12 text-3xl">
    Theme
  </h2>
  <hr>

  <div class="my-5 flex flex-wrap items-center justify-between">
    <div class="flex gap-2">
      <button
        class="flex size-10 items-center justify-center rounded-full bg-yellow-300 text-black"
        @click="() => changeThemeMode('light')"
      >
        <Icon icon="light_mode" />
      </button>
      <button
        class="flex size-10 items-center justify-center rounded-full bg-gray-700 text-white"
        @click="() => changeThemeMode('dark')"
      >
        <Icon icon="dark_mode" />
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        class="flex size-10 items-center justify-center rounded-full bg-orange-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'orange' }"
        @click="() => changeThemeColor('orange')"
      />
      <button
        class="flex size-10 items-center justify-center rounded-full bg-red-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'red' }"
        @click="() => changeThemeColor('red')"
      />
      <button
        class="flex size-10 items-center justify-center rounded-full bg-green-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'green' }"
        @click="() => changeThemeColor('green')"
      />
      <button
        class="flex size-10 items-center justify-center rounded-full bg-blue-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'blue' }"
        @click="() => changeThemeColor('blue')"
      />
      <button
        class="flex size-10 items-center justify-center rounded-full bg-violet-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'violet' }"
        @click="() => changeThemeColor('violet')"
      />
      <button
        class="flex size-10 items-center justify-center rounded-full bg-pink-500"
        :class="{ 'border-4 border-primaryText': themes?.color == 'pink' }"
        @click="() => changeThemeColor('pink')"
      />
    </div>
  </div>
</template>
