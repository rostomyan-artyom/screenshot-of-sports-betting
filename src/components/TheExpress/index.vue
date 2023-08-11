<script lang="ts">
export default {
  name: 'TheExpress',
}
</script>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { useToast } from 'balm-ui';

import ExpressItem from '@/components/TheExpress/ExpressItem/index.vue';
import IExpressItemType from '@/types/expressItemType';

const props = defineProps({
  express: {
    type: Array as PropType<IExpressItemType[]>,
    default: () => ([]),
  },
})
defineEmits(['removeItem']);

const $toast = useToast();

const showExpress = ref(true);

const createScreenshot = () => {
  $toast('Создание скриншота из эксрпесса. Скриншот будет доставлен Сантой Клаусом на рождество, если вы будете себя хорошо вести)');
}
</script>

<template>
  <div class="the-express">
    <div class="the-express__header">
      <div class="h5">
        Экспресс
      </div>

      <ui-button
        class="ml-2"
        @click="showExpress = !showExpress"
      >
        {{ showExpress ? 'Скрыть' : 'Показать' }}
      </ui-button>
    </div>

    <div
      v-if="showExpress"
      class="the-express__content"
    >
      <ExpressItem
        v-for="expressItem in props.express"
        :key="expressItem.id"
        :expressItem="expressItem"
        class="the-express__item"
        @removeItem="$emit('removeItem', expressItem.id)"
      />
    </div>

    <ui-button
      type="raised"
      class="mt-2 w-100"
      @click="createScreenshot"
    >
      Создать скриншот
    </ui-button>
  </div>
</template>

<style lang="scss" scoped>
.the-express {
  background-color: #fff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 4px -1px #5555557a;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    max-height: 50vh;
    overflow: auto;
    margin-top: 20px;
  }

  &__item {
    width: 300px;

    &:not(:first-child) {
      margin-top: 10px;
    }

    &:not(:last-child) {
      padding-bottom: 10px;
      border-bottom: 1px solid #000;
    }
  }
}
</style>
