<script setup>
import { computed, nextTick, reactive } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { helpers, minLength, required, sameAs } from '@vuelidate/validators';

import Input from '@form/Input.vue';
import Submit from '@form/Submit.vue';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

const defaultState = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const state = reactive({ ...defaultState });

const rules = computed(() => ({
  password: { required },
  newPassword: { required, minLength: minLength(8) },
  confirmPassword: {
    required,
    sameAsPassword: helpers.withMessage('Passwords do not match', sameAs(state.newPassword)),
  },
}));

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  useFetch({ url: `user/password`, method: 'PATCH', body: state }).then(async () => {
    successSnackBar('Password updated');

    await nextTick();
    v$.value.$reset();
    Object.assign(state, defaultState);
  });
};
</script>

<template>
  <h2 class="mt-12 text-3xl">
    Security
  </h2>
  <hr>

  <form
    class="my-5"
    @submit.prevent="submitForm"
  >
    <Input
      v-model="state.password"
      label="Old password"
      type="password"
      placeholder="●●●●●●●●●●"
      :error="v$.password.$errors[0]?.$message"
    />

    <div class="flex content-stretch justify-between gap-6">
      <Input
        v-model="state.newPassword"
        label="New password"
        type="password"
        class="w-full"
        :error="v$.newPassword.$errors[0]?.$message"
      />

      <Input
        v-model="state.confirmPassword"
        label="Confirm new password"
        type="password"
        class="w-full"
        :error="v$.confirmPassword.$errors[0]?.$message"
      />
    </div>

    <Submit>Update</Submit>
  </form>
</template>
