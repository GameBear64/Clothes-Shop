<script setup>
import { computed, provide, ref } from 'vue';
import { useRoute } from 'vue-router';

import Icon from '@components/Icon.vue';
import CommentSection from '@components/Sections/Comments.vue'
import Gallery from '@components/Sections/Gallery.vue';
import StarRating from '@components/StarRating.vue';

import { addToCart } from '@utils/CartStore';
import { errorSnackBar,successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

const route = useRoute();

const product = ref();

product.value = await useFetch({ url: `products/${route.params.id}` });

const refreshProduct = async () => await useFetch({ url: `products/${route.params.id}` }).then(data => (product.value = data));

provide('refreshProduct', refreshProduct);
provide('productId', product.value.id)

const addToFavorite = () => {
  useFetch({ url: `products/${route.params.id}/favorite`, method: 'POST' }).then(boolean => {
    product.value.isFavorite = boolean;
    if (boolean) { successSnackBar('Added to favorites') } else { errorSnackBar('Removed from favorites') }
  });
};

const rating = computed(
  () =>
    product.value.comments.reduce((total, comment) => total + comment.rating, 0) / product.value.comments.length || 5
);
</script>

<template>
  <div class="m-auto flex w-full flex-wrap items-center px-5 py-24 sm:w-2/3 md:w-5/6 xl:w-3/5">
    <div class="h-fit w-full object-cover object-center md:w-1/2">
      <Gallery :images="product.image" />
    </div>

    <div class="mt-6 w-full md:mt-0 md:w-1/2 md:py-6 md:pl-10">
      <h1 class="title-font mb-1 text-3xl font-medium text-primaryText">
        {{ product.name }}
      </h1>
      <div class="mb-4 flex font-semibold">
        <span class="flex items-center">
          <StarRating :rating="rating" />
          <span class="ml-3 text-secondaryText">{{ product.comments.length }} Reviews</span>
        </span>
      </div>

      <div class="flex">
        <div class="flex items-center gap-2">
          <p class="mr-2 text-2xl font-semibold text-primaryText">
            ${{ product.price }}
          </p>
        </div>
      </div>

      <hr class="mt-5 border-gray-200">
      <p class="text-justify leading-relaxed">
        {{ product.description }}
      </p>
      <hr class="mt-5 border-gray-200">

      <div class="flex justify-between">
        <button
          type="button"
          class="button"
          @click="addToCart(product)"
        >
          Add to cart
        </button>
        <button
          v-if="product.isFavorite"
          type="button"
          class="favorite-button"
          @click="addToFavorite()"
        >
          <Icon
            icon="heart_minus"
            full
          />
        </button>
        <button
          v-else
          type="button"
          class="disabled-button"
          @click="addToFavorite()"
        >
          <Icon
            icon="heart_plus"
            full
          />
        </button>
      </div>
    </div>
  </div>

  <CommentSection :comments="product.comments" />
</template>
