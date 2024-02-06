<script setup>
import { computed,ref } from 'vue';
import { useRouter } from 'vue-router';

import { cart } from '@utils/CartStore';

import Icon from '../Icon.vue';

const menuOpen = ref(false);

const router = useRouter();

function logout() {
  localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
  router.push('/login');
}

const cartItems = computed(() => cart.cartItems.reduce((acc, item) => item.quantity + acc, 0));
</script>

<template>
  <div class="flex h-12 w-full items-center justify-between border-b border-primary bg-base shadow sm:px-4">
    <div class="flex sm:gap-2">
      <router-link
        to="/"
        class="block px-2 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate sm:px-4"
      >
        Products
      </router-link>
    </div>
    <div class="flex items-center justify-between gap-5">
      <router-link
        class="hover:no-underline"
        to="/cart"
      >
        <button
          class="relative z-10 flex items-center rounded-md border border-transparent p-2 text-sm text-primaryText hover:bg-base-moderate"
        >
          <div
            v-if="cartItems"
            class="absolute right-0 top-0"
          >
            <p class="min-h-1 min-w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {{ cartItems }}
            </p>
          </div>
          <Icon icon="shopping_cart" />
        </button>
      </router-link>
      <div class="relative inline-block">
        <button
          class="relative z-10 flex items-center rounded-md border border-transparent p-2 text-sm text-primaryText hover:bg-base-moderate"
        >
          <Icon
            icon="menu"
            clickable
            @click="menuOpen = !menuOpen"
          />
        </button>

        <div
          v-if="menuOpen"
          class="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-md border bg-base shadow-xl"
          @mouseleave="menuOpen = false"
        >
          <router-link
            to="/wishlist"
            class="block px-4 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate"
          >
            Wish List
          </router-link>

          <router-link
            to="/history"
            class="block px-4 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate"
          >
            History
          </router-link>

          <router-link
            to="/settings"
            class="block px-4 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate"
          >
            Settings
          </router-link>

          <hr class="border-base-moderate">

          <p
            class="block cursor-pointer px-4 py-3 text-sm capitalize text-red-600 transition-colors duration-200 hover:bg-base-moderate"
            @click="logout"
          >
            Sign Out
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
