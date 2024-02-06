import router from '../router';

import { errorSnackBar } from './snackbars';

export default function useFetch({ url, requireAuth = true, method, body }) {
  let options = {
    method,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      jwt: requireAuth ? window.localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME) : '',
    },
  };

  return fetch(`${window.location.protocol}//${window.location.hostname}:3030/${url}`, options)
    .then(async res => {
      const data = await res.text().then(text => (text ? JSON.parse(text) : null));

      if (res.status === 401) {
        localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_NAME);
        router.push('/login');
      }
      if (!res.ok) return Promise.reject(data || res.status);

      return data;
    })
    .catch(error => {
      errorSnackBar(error);
      return Promise.reject(error);
    });
}
