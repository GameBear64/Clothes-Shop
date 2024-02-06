<script setup>
const { comments } = defineProps(['comments']);

import { computed, inject, nextTick, reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { maxValue,minLength, minValue, required } from '@vuelidate/validators';

import Comment from '@components/Bubbles/Comment.vue';
import Rating from '@components/Form/Rating.vue';
import Submit from '@components/Form/Submit.vue';
import TextArea from '@components/Form/TextArea.vue';

import useFetch from '@utils/useFetch';
import { user } from '@utils/UserStore';

const refreshProduct = inject('refreshProduct')
const productId = inject('productId')

const hasCommented = computed(() => comments.some(({ authorId }) => authorId == user.id));

const state = reactive({ text: '', rating: 0 });

const rules = computed(() => ({
  text: { required, minLength: minLength(30) },
  rating: { required, minValue: minValue(1), maxValue: maxValue(5) },
}));

const v$ = useVuelidate(rules, state);

const postComment = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) return;

  useFetch({url: `comment/${productId}`, method: 'POST', body: state}).then(async () => {
    refreshProduct()

    await nextTick()
    v$.value.$reset()
    Object.assign(state, { text: '', rating: 0 });
  });
};
</script>

<template>
  <div class="m-auto w-full pb-24 sm:w-2/3 md:w-5/6 xl:w-3/5">
    <h2 class="mt-12 text-3xl">
      Comments
    </h2>
    <hr class="mb-5">
    <div
      v-if="!hasCommented"
      class="rounded border-2 border-base-moderate p-5 shadow"
    >
      <form
        class="flex flex-col justify-between"
        @submit.prevent="postComment"
      >
        <TextArea
          v-model="state.text"
          class="flex-1"
          placeholder="This product made me feel.... it is very... in conclusion...."
          :error="v$.text.$errors[0]?.$message"
        />
        <div class="flex justify-between">
          <Rating
            v-model:rating="state.rating"
            :error="v$.rating.$errors[0]?.$message"
          />
          <Submit override="button">
            Post comment
          </Submit>
        </div>
      </form>
    </div>
    <Comment
      v-for="comment in comments"
      :comment="comment"
    />
  </div>
</template>