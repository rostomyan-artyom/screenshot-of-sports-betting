import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'balm-ui';
import IExpressItemType from '@/types/expressItemType';

export const useExpressStore = defineStore('quotes', () => {
  const $toast = useToast();

  const express = ref<IExpressItemType[]>([]);

  function addInExpress(item: IExpressItemType) {
    express.value.push(item)

    $toast('Ставка добавлена в экспресс');
  }

  function removeFromExpress(id: string) {
    express.value = express.value.filter((item) => item.id !== id);

    $toast('Ставка удалена из экспресса');
  }

  return {express, addInExpress, removeFromExpress};
})