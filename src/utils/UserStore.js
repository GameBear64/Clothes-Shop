import { reactive } from 'vue';

export const user = reactive({ id: null });

export const setId = newId => {
  user.id = newId;
};

export const removeId = () => {
  user.id = null;
};
