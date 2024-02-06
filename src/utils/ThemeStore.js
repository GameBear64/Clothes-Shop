import { reactive } from 'vue';

export const themes = reactive({
  mode: localStorage.getItem('theme-mode') || 'light',
  color: localStorage.getItem('theme-color') || 'blue',
});
