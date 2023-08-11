<script lang="ts">
export default {
  name: 'QuoteView',
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getQuoteByAlias } from '@/api/quotes';

import QuoteStakes from '@/components/TheQuote/QuoteStakes.vue';
import CreateScreenModal from '@/components/TheQuote/Modals/CreateScreenModal/index.vue';

import IQuoteType from '@/types/quoteType';

const route = useRoute();
const modalOpen = ref(false);

let quote = ref<IQuoteType>();
let isLoading = ref(false);

const initQuote = async () => {
  isLoading.value = true;

  try {
    const { data } = await getQuoteByAlias(route.params.quote);
    quote.value = data[0];
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
initQuote()

watch(() => route.params.quote, () => {
  initQuote();
});

const quoteId = ref();
const selectedStakeTypeId = ref();
const selectedStakeId = ref();

const onStakeSelect = (
  stakeId: number,
  stakeTypeId: number
) => {
  quoteId.value = quote.value?.id;
  selectedStakeTypeId.value = stakeTypeId;
  selectedStakeId.value = stakeId;
  modalOpen.value = true;
}
</script>

<template>
  <div class="quote-view">
    <div
      v-if="isLoading"
      class="quote-view__loading"
    >
      <div>
        Загрузка...
      </div>
      <ui-spinner active />
    </div>
    <template v-else>
      <div class="h1 mb-2">
        {{ quote?.N }}
      </div>
      <div class="mb-1">
        Страна: {{ quote?.CtN }}
      </div>
      <div class="mb-1">
        Чемпионат: {{ quote?.CN }}
      </div>
  
      <div class="quote-view__stakes">
        <div class="quote-view__stakes-content">
          <div
            v-for="type in quote?.stakeTypes"
            :key="type.id"
            class="mb-3"
          >
            <div class="h4 mb-1">
              {{ type.N }}
            </div>
      
            <QuoteStakes
              :stakes="type.stakes"
              @onStakeSelect="onStakeSelect($event, type.id)"
            />
          </div>
        </div>
      </div>

      <CreateScreenModal
        :isOpen="modalOpen"
        :quoteId="quoteId"
        :stakeTypeId="selectedStakeTypeId"
        :stakeId="selectedStakeId"
        @closeModal="modalOpen = false" 
        @updateModalStatus="modalOpen = $event"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.quote-view {
  padding: 20px;
  min-height: 100vh;

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__stakes {
    overflow: auto;
  }

  &__stakes-content {
    min-width: 800px;
  }
}
</style>
