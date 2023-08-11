<script lang="ts">
export default {
  name: 'OfficesItem',
}
</script>

<script lang="ts" setup>
import { PropType } from 'vue';
import IOfficeType from '@/types/officeType';

const props = defineProps({
  office: {
    type: Object as PropType<IOfficeType>,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="officies-item rounded">
    <img
      :src="props.office.logo"
      :alt="props.office.title" 
      class="officies-item__img"
    />
  </div>
</template>

<style lang="scss" scoped>
.officies-item {
  overflow: hidden;
  cursor: pointer;
  transition: .1s;

  &:active {
    opacity: 0.7;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
