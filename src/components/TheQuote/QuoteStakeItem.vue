<script lang="ts">
export default {
  name: 'QuoteStakeItem',
}
</script>

<script lang="ts" setup>
const props = defineProps({
  stake: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['onStakeSelect']);
</script>

<template>
  <div class="quoute-stake-item d-flex justify-content-end p-3">
    <div class="d-flex align-items-center">
      <div>
        {{ props.stake.N }}

        <template v-if="props.stake.A || props.stake.A === 0">
          ({{ props.stake.A }})
        </template>
      </div>
      <ui-button
        type="raised"
        class="ml-2"
        @click="emit('onStakeSelect')"
      >
        {{ props.stake.R }}
      </ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quoute-stake-item {
  background-color: #211f1f;
  color: #fff;
}
</style>
