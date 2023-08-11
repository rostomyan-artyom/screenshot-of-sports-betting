<script lang="ts">
export default {
  name: 'TheAside',
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  pages: {
    type: Array,
    default: () => ([]),
  },
  dataFormat: { 
    type: Object,
    default: () => ({
      label: 'title',
      value: 'path',
      children: 'pages',
    }),
  },
})

const route = useRoute();
const router = useRouter();

const selectedPage = ref(route.fullPath);

watch(selectedPage, (newValue) => {
  router.push(newValue);
})
watch(route, (newValue) => {
  selectedPage.value = newValue.fullPath;
})
</script>

<template>
  <aside>
    <ui-tree
      v-model="selectedPage"
      :data="pages"
      :data-format="dataFormat"
      :max-level="3"
      autoExpandParent
    />
  </aside>
</template>

<style lang="scss" scoped>
</style>
