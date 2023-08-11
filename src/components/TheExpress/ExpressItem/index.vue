<script lang="ts">
export default {
  name: 'ExpressItem',
}
</script>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { getQuoteById } from '@/api/quotes';
import { IQuoteType, IStakeGroupType, IStakeType } from '@/types/quoteType';
import IExpressItemType from '@/types/expressItemType';

const props = defineProps({
  expressItem: {
    type: Object as PropType<IExpressItemType>,
    default: () => ({}),
  },
  stake: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['removeItem']);
const deleteModalShow = ref(false);

const removeItem = () => {
  emit('removeItem');
  deleteModalShow.value = false;
}

const findActualStake = async (
  quoteId: number,
  stakeTypeId: number,
  stakeId: number,
): Promise<IStakeType> => {
  const { data } = await getQuoteById(quoteId);

  const actualQuote: IQuoteType = data[0];
  const actualStakeType: IStakeGroupType 
    = actualQuote.stakeTypes.find((item: IStakeGroupType) => item.id === stakeTypeId) as IStakeGroupType;
    
  return actualStakeType.stakes.find((item: IStakeType) => item.id === stakeId) as IStakeType;
}

const stake = ref();

const initStake = async () => {
  stake.value = await findActualStake(
    props.expressItem.quoteId,
    props.expressItem.stakeTypeId,
    props.expressItem.stakeId
  )
}
initStake();
</script>

<template>
  <div class="express-item">
    <div v-if="stake" class="express-item__info">
      <div>
        Название: {{ props.expressItem.fullName }}
      </div>
      <div>
        Ставка: {{ stake?.SFN }}
        <span v-if="stake?.A || stake?.A === 0">
          {{ `(${stake?.A})` }}
        </span>
      </div>
      <div>
        Коэффициент: {{ props.expressItem.ratio }}
      </div>
    </div>

    <div v-else style="width: 100px;">
      <ui-spinner size="small" active />
    </div>

    <div class="express-item__actions ml-2">
      <ui-icon-button
        icon="delete"
        :class="$theme.getThemeClass('error')"
        @click="deleteModalShow = true"
      />
    </div>

    <ui-dialog
      v-model="deleteModalShow"
    >
      <ui-dialog-title>Вы уверены что хотите удалить прогноз из экспресса?</ui-dialog-title>
      <ui-dialog-actions>
        <ui-button @click="deleteModalShow = false">
          Отмена
        </ui-button>
        <ui-button
          class="ml-2"
          :class="$theme.getThemeClass('error')"
          @click="removeItem"
        >
          Удалить
        </ui-button>
      </ui-dialog-actions>
    </ui-dialog>
  </div>
</template>

<style lang="scss" scoped>
.express-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 0;
}
</style>
