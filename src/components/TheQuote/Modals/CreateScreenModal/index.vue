<script lang="ts">
export default {
  name: 'CreateScreenModal',
}
</script>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useExpressStore } from '@/store/express';
import { getQuoteById } from '@/api/quotes';
import { bOffices } from '@/helpers/consts';
import { useToast } from 'balm-ui';

import OfficesList from '@/components/TheQuote/Modals/CreateScreenModal/OfficesList/index.vue';
import OfficesItem from '@/components/TheQuote/Modals/CreateScreenModal/OfficesList/OfficesItem/index.vue';

import { IQuoteType, IStakeGroupType, IStakeType } from '@/types/quoteType';
import IExpressItemType from '@/types/expressItemType';

const quotesStore = useExpressStore();
const emit = defineEmits(['updateModalStatus']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  quoteId: {
    type: Number,
    default: null,
  },
  stakeTypeId: {
    type: Number,
    default: null,
  },
  stakeId: {
    type: Number,
    default: null,
  },
})

const $toast = useToast();

const modalOpen = ref(false);

let quote = ref<IQuoteType>();
let isLoading = ref(false);

const fetchQuote = async () => {
  isLoading.value = true;

  try {
    const { data } = await getQuoteById(props.quoteId);
    quote.value = data[0];
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

watch(() => props.isOpen, async (newValue) => {
  modalOpen.value = newValue;
  ratioSelectedByUser.value = '';
  fullNameSelectedByUser.value = '';

  if (newValue) {
    await fetchQuote();
  }
})
watch(modalOpen, (newValue) => emit('updateModalStatus', newValue));

const selectedOfficeId = ref();
const selectedOffice = computed(() => {
  return bOffices.find(item => item.id === selectedOfficeId.value);
})

const selectOffice = (officeId: number) => {
  selectedOfficeId.value = officeId;
}

const actualStakeType = computed((): IStakeGroupType  => {
  return quote.value?.stakeTypes.find(item => {
    return Number(item.id) === Number(props.stakeTypeId);
  }) as IStakeGroupType;
})
const actualStake = computed((): IStakeType => {
  // @ts-ignore: Unreachable code error
  if (!actualStakeType.value?.stakes || !actualStakeType.value?.stakes.length) return;

  return actualStakeType.value?.stakes.find(item => {
    return item.id === props.stakeId;
  }) as IStakeType
})

const ratio = computed(() => actualStake.value?.R);
const fullName = computed(() => {
  if (quote.value) {
    if (selectedOffice.value?.nameFunc) {
      return selectedOffice.value?.nameFunc(
        quote.value?.FT,
        quote.value?.ST,
        actualStake.value?.A,
      )
    } else {
      return `${quote.value?.FT} vs ${quote.value?.ST}`;
    }
  }
})

// коэффициент и название юзер может изменять, выносим их в ref
const ratioSelectedByUser = ref<string | null>();
const fullNameSelectedByUser = ref<string | null>();

const onAddInExpress = () => {
  if (isNaN(Number(ratioSelectedByUser.value))) {
    $toast('Введенный вами коэффициент не является числом. Возможно вам стоит заменить запятую "," - на точку "."');

    return;
  }
  const newStake: IExpressItemType = {
    id: uuidv4(),
    quoteId: props.quoteId,
    stakeTypeId: props.stakeTypeId,
    stakeId: props.stakeId,
    fullName: fullNameSelectedByUser.value || fullName.value,
    ratio: Number(ratioSelectedByUser.value) || ratio.value,
  };
  quotesStore.addInExpress(JSON.parse(JSON.stringify(newStake)))

  modalOpen.value = false;
}

const createScreenshot = () => {
  $toast('Создание скриншота. Скриншот будет доставлен Сантой Клаусом на рождество, если вы будете себя хорошо вести)');
}
</script>

<template>
  <ui-dialog
    v-model="modalOpen"
    fullscreen
    class="create-screen-modal"
  >
    <ui-dialog-title>Создание скриншота</ui-dialog-title>
    <ui-dialog-content>
      <div v-if="!selectedOfficeId">
        <div clas="h4 mb-3">
          1. Выберите БК для создания скриншота
        </div>
  
        <OfficesList
          :officies="bOffices"
          @selectOffice="selectOffice"
        />
      </div>

      <div
        v-else
        class="d-flex"
      >
        <div>
          <OfficesItem
            :office="selectedOffice" 
            class="create-screen-modal__selected-office mb-1"
          />

          <ui-button @click="selectedOfficeId = null">
            Поменять
          </ui-button>
        </div>
        <div class="ml-3">
          <div v-if="quote" class="mb-2">
            Матч - {{ quote.N }}
          </div>
          <div v-if="actualStake" class="mb-2">
            Тип - {{ actualStake.TN }}
          </div>
          <div v-if="actualStake" class="mb-2">
            Ставка - {{ actualStake.N }} {{ actualStake.A ? `(${actualStake.A})` : '' }}
          </div>
          <div class="mb-2">
            <ui-textfield v-model="ratioSelectedByUser" :placeholder="ratio">
              Коэффициент
            </ui-textfield>
          </div>
          <div class="mb-2">
            <ui-textfield v-model="fullNameSelectedByUser" :placeholder="fullName">
              Полное название
            </ui-textfield>
          </div>
        </div>
      </div>
    </ui-dialog-content>
    <ui-dialog-actions>
      <ui-button
        class="mr-2"
        @click="modalOpen = false"
      >
        Отмена
      </ui-button>
      <ui-button
        type="raised"
        class="mr-2"
        @click="onAddInExpress"
      >
        Добавить в экспресс
      </ui-button>
      <ui-button
        v-if="selectedOfficeId"
        type="raised"
        @click="createScreenshot"
      >
        Создать скриншот
      </ui-button>
    </ui-dialog-actions>
  </ui-dialog>
</template>

<style lang="scss" scoped>
.create-screen-modal {

  &__selected-office {
    width: 124px;
    height: 50px;
  }
}
</style>