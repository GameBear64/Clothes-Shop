<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { themes } from '@utils/ThemeStore.js';

import NavBar from './components/Layout/NavBar.vue';
import Loading from './views/Loading.vue';

const route = useRoute();
const shouldShowNavbar = ref(false);

// show navbar based on route to avoid unauthorized access
watch(
  () => route.path,
  () => {
    shouldShowNavbar.value = !['/login', '/register'].includes(route.path);
  }
);
</script>

<template>
  <div
    :class="`theme-${themes.mode} theme-${themes.color}`"
    class="flex h-screen flex-col bg-base text-primaryText"
  >
    <NavBar v-show="shouldShowNavbar" />
    <div class="flex-1 overflow-x-auto">
      <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
          <component :is="Component" />
          <!-- TODO: better loading -->
          <template #fallback>
            <Loading />
          </template>
        </Suspense>
      </RouterView>
    </div>
  </div>
</template>
