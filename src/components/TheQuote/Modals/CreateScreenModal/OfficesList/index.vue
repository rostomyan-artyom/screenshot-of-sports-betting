<script lang="ts">
export default {
  name: 'OfficesList',
}
</script>

<script lang="ts" setup>
import { PropType } from 'vue';
import OfficesItem from '@/components/TheQuote/Modals/CreateScreenModal/OfficesList/OfficesItem/index.vue';

import IOfficeType from '@/types/officeType';

const props = defineProps({
  officies: {
    type: Array as PropType<IOfficeType[]>,
    default: () => ([]),
  }
})

const emit = defineEmits(['selectOffice']);
</script>

<template>
  <div class="offices-list d-flex">
    <OfficesItem
      v-for="office in props.officies" 
      :key="office.id"
      :office="office"
      class="offices-list__item"
      @click="emit('selectOffice', office.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.offices-list {
  gap: 10px;

  &__item {
    width: calc(100% / 3 - 10px);
    height: 250px;

    @media (max-width: 1600px) {
      height: 180px;
    }
    @media (max-width: 1200px) {
      height: 110px;
    }
  }
}
</style>
