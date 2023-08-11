import axios from 'axios';
import { useExpressStore } from '@/store/express';
import { useToast } from 'balm-ui';

const $toast = useToast();
const baseURL = 'http://localhost:3000'; // без env т.к пример

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response = {} } = error;
    const { status = {} } = response;

    if (status === 500) {
      $toast('Ошибка при выполнении запроса');
      return Promise.reject(error);
    }


    if (status === 403) {
      $toast('Отсутствуют необходимые права');
      return Promise.reject(error);
    }

    if (status === 401) {
      useExpressStore.logout();
      return Promise.reject(error);
    }

    $toast('Произошла ошибка. Убедитесь что json-server запущен. json-server --watch db.json');

    return Promise.reject(error);
  },
);

export function createApi(token: string) {
  api.defaults.headers = {
    ...api.defaults.headers,
    Authorization: `${token}`,
  };
}
