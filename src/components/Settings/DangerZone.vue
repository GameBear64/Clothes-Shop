<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Modal from '@components/Modal.vue';

import Input from '@form/Input.vue';

import { successSnackBar } from '@utils/snackbars';
import useFetch from '@utils/useFetch';

const router = useRouter();

const showLogOutModal = ref(false);
const showDeleteModal = ref(false);

const state = reactive({ password: '' });
const rules = computed(() => ({ password: { required } }));
const v$ = useVuelidate(rules, state);

const logOut = () => {
  localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
  router.push('/');
};

const deleteAccount = () => {
  useFetch({ url: `user`, method: 'DELETE', body: state }).then(async () => {
    successSnackBar('Profile deleted, sorry to see you go');
    logOut();
  });
};
</script>

<template>
  <h2 class="mt-12 text-3xl">
    Danger zone
  </h2>
  <hr>

  <div class="my-5 flex justify-around">
    <button
      class="reject-button"
      @click="() => (showLogOutModal = true)"
    >
      Log out
    </button>

    <button
      class="reject-button"
      @click="() => (showDeleteModal = true)"
    >
      Delete account
    </button>
  </div>
  <Modal
    v-if="showLogOutModal"
    easy-close
    :close="() => (showLogOutModal = false)"
    title="Are you sure about this?"
  >
    <p>You are about to exit your account, confirm?</p>
    <template #buttons>
      <button
        class="reject-button"
        @click="logOut"
      >
        Log out
      </button>
    </template>
  </Modal>
  <Modal
    v-if="showDeleteModal"
    :close="() => (showDeleteModal = false)"
    title="Are you sure about this?"
  >
    <p>You are about to delete your account.</p>
    <p>This action is permanent and cannot be undone.</p>
    <p>Confirm by typing in your password.</p>
    <Input
      v-model="state.password"
      class="mx-auto mt-5 w-2/3"
      type="password"
      placeholder="●●●●●●●●●●"
      :error="v$.password.$errors[0]?.$message"
    />

    <template #buttons>
      <button
        class="reject-button"
        @click="deleteAccount"
      >
        Delete account
      </button>
    </template>
  </Modal>
</template>
