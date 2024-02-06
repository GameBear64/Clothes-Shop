<script setup>
import { computed, nextTick, reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';

import Input from '@form/Input.vue';
import Submit from '@form/Submit.vue';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

const defaultState = {
  name: '',
  email: '',
};

const state = reactive({ ...defaultState });

useFetch({ url: `user` }).then(({ name, email }) => Object.assign(state, { name, email }));

const rules = computed(() => ({
  name: { required, minLength: minLength(3), maxLength: maxLength(30) },
  email: { required, email },
}));

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  useFetch({ url: `user`, method: 'PATCH', body: state }).then(async jwt => {
    // check backed documentation for explanation
    localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, jwt);
    successSnackBar('Profile updated');

    await nextTick();
    v$.value.$reset();
  });
};
</script>

<template>
  <h2 class="mt-12 text-3xl">
    User Details
  </h2>
  <hr>
  <form
    class="my-5"
    @submit.prevent="submitForm"
  >
    <Input
      v-model="state.name"
      label="Name"
      placeholder="Jon Doe"
      :error="v$.name.$errors[0]?.$message"
    />
    <Input
      v-model="state.email"
      label="Email"
      placeholder="user@example.com"
      :error="v$.email.$errors[0]?.$message"
    />
    <Submit>Save</Submit>
  </form>
</template>
