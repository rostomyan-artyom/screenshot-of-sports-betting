<script lang="ts">
export default {
  name: 'QuoteStakes',
}
</script>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { IStakeType } from '@/types/quoteType';

import QuoteStakeItem from '@/components/TheQuote/QuoteStakeItem.vue';

const props = defineProps({
  stakes: {
    type: Array as PropType<IStakeType[]>,
    default: () => ([]),
  },
});

const maxQueue = computed(() => {
  let stakes: IStakeType[] = JSON.parse(JSON.stringify(props.stakes));
  stakes.sort((a, b) => b.Q - a.Q);
  return stakes[0].Q;
})


const emit = defineEmits(['onStakeSelect']);
</script>

<template>
  <div class="quote-stakes d-flex rounded">
    <QuoteStakeItem 
      v-for="stake in props.stakes"
      :key="stake.id"
      :stake="stake"
      :class="[
        'quote-stakes__stake',
        `quote-stakes__stake_${maxQueue}`
      ]"
      @onStakeSelect="emit('onStakeSelect', stake.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.quote-stakes {
  overflow: hidden;

  &__stake {
    &_2 {
      width: 50%;
    }
    
    &_3 {
      width: 33.3%;
    }
  }
}
</style>
