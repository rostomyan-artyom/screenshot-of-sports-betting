import { api } from '@/helpers/api';

export const checkToken = () => {
  return api.get('/authorize');
}

type LoginArgs = {
  login: string,
  password: string,
};

export const loginRequest = ({ login, password }: LoginArgs) => {
  console.log(login, password);
  // используем json сервер, имитируем работу с апи
  return api.put('/authorize', { token: "anything" });
}