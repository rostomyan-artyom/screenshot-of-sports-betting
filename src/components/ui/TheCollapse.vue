<script lang="ts">
export default {
  name: 'TheCollapse',
}
</script>
    
<script lang="ts" setup>
</script>
    
<template>
  <ui-collapse
    with-icon
    :ripple="1"
  >
    <template #expand-more-icon>
      <ui-icon>arrow_drop_down</ui-icon>
    </template>
    <template #expand-less-icon>
      <ui-icon>arrow_right</ui-icon>
    </template>
    <template #toggle>
      <div><slot name="title" /></div>
    </template>

    <div class="">
      <slot />
    </div>
  </ui-collapse>
</template>
    
<style lang="scss" scoped></style>
    