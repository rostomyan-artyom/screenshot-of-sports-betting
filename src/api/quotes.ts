import { api } from '@/helpers/api';
import IQuoteType from '@/types/quoteType';

const timeOut = async (time: number) => await new Promise((res: Function) => {
  setTimeout(() => {
    res();
  }, time)
})

export const getQuotes = () => {
  return api.get('/quotes');
}

export const getQuoteById = async (id: number): Promise<IQuoteType> => {
  // в реальных проектах такого не будет )) для красоты запрос сделаю длинным. так кстати в некоторых ИИ делают :D
  await timeOut(150);

  return api.get('/quotes', {
    params: {
      id,
    }
  });
}

export const getQuoteByAlias = async (alias: string): Promise<IQuoteType> => {
  // в реальных проектах такого не будет )) для красоты запрос сделаю длинным. так кстати в некоторых ИИ делают :D
  await timeOut(150);

  return api.get('/quotes', {
    params: {
      alias,
    }
  });
}
