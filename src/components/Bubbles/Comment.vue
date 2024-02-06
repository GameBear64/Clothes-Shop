<script setup>
const { comment } = defineProps(['comment']);

import { computed,inject,nextTick,reactive, ref } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { maxValue,minLength, minValue, required } from '@vuelidate/validators';

import Rating from '@components/Form/Rating.vue';
import TextArea from '@components/Form/TextArea.vue';
import Icon from '@components/Icon.vue';
import StarRating from '@components/StarRating.vue';

import { dateFormatter } from '@utils/helpers';
import useFetch from '@utils/useFetch';
import { user } from '@utils/UserStore';

import Modal from '../Modal.vue';

const refreshProduct = inject('refreshProduct')
const productId = inject('productId')

const menuOpened = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

const state = reactive({ text: comment.text, rating: comment.rating });

const rules = computed(() => ({
  text: { required, minLength: minLength(8) },
  rating: { required, minValue: minValue(1), maxValue: maxValue(5) },
}));

const v$ = useVuelidate(rules, state);

const deleteComment = async () => {
  useFetch({url: `comment/${productId}`, method: 'DELETE'}).then(() => {
    refreshProduct()
  })
};

const editComment = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  useFetch({url: `comment/${productId}`, method: 'PATCH', body: state}).then(async () => {
    showEditModal.value = false
    refreshProduct();

    await nextTick();
    v$.value.$reset();
  })
};
</script>

<template>
  <div class="my-5 rounded border-2 border-base-moderate p-5 shadow">
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-wrap gap-3">
        <h3 class="text-xl font-semibold">
          {{ comment.name }}
        </h3>
        <StarRating :rating="comment.rating" />
      </div>
      <div class="flex gap-2">
        <p class="text-secondaryText">
          {{ dateFormatter.format(comment.date * 1000) }}
        </p>
        <div class="relative inline-block">
          <Icon
            v-if="comment.authorId == user.id"
            icon="more_vert"
            clickable
            @click="menuOpened = !menuOpened"
          />
          <div
            v-if="menuOpened"
            class="absolute right-0 z-20 mt-2 overflow-hidden rounded-md border border-base-moderate bg-base shadow-xl"
            @mouseleave="menuOpened = false"
          >
            <p
              class="block cursor-pointer px-4 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate"
              @click="showEditModal = true"
            >
              Edit
            </p>
            <p
              class="block cursor-pointer px-4 py-3 text-sm capitalize text-primaryText transition-colors duration-200 hover:bg-base-moderate"
              @click="showDeleteModal = true"
            >
              Delete
            </p>
          </div>
        </div>
      </div>
    </div>
    <p>
      {{ comment.text }}
    </p>
  </div>

  <Modal
    v-if="showDeleteModal"
    :close="() => (showDeleteModal = false)"
    title="Are you sure about this?"
  >
    <p>You are about to delete this comment, confirm?</p>
    <p class="my-2 rounded bg-base-moderate p-2">
      {{ comment.text }}
      <StarRating :rating="comment.rating" />
    </p>
    <template #buttons>
      <button
        class="button"
        @click="showDeleteModal = false"
      >
        Cancel
      </button>
      <button
        class="reject-button"
        @click="deleteComment"
      >
        Delete
      </button>
    </template>
  </Modal>
  <Modal
    v-if="showEditModal"
    :close="() => (showEditModal = false)"
    easy-close
    title="Editing comment..."
  >
    <TextArea
      v-model="state.text"
      class="flex-1"
      placeholder="This product made me feel.... it is very... in conclusion...."
      :error="v$.text.$errors[0]?.$message"
    />
    <Rating
      v-model:rating="state.rating"
      :error="v$.rating.$errors[0]?.$message"
    />

    <template #buttons>
      <button
        class="button"
        @click="showEditModal = false"
      >
        Cancel
      </button>
      <button
        class="agree-button"
        @click="editComment"
      >
        Update
      </button>
    </template>
  </Modal>
</template>
