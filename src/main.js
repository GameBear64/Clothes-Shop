import { createApp } from 'vue';

// find user
import useFetch from '@utils/useFetch';
import { setId } from '@utils/UserStore';

import App from './App.vue';

import './style.css';
useFetch({ url: 'user' }).then(user => setId(user?.id));

//including the swiper web components
import { register } from 'swiper/element/bundle';
register();

import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
