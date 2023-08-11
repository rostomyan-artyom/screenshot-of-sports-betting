<script lang="ts">
export default {
  name: 'App',
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useExpressStore } from '@/store/express';
import { useAuthStore } from '@/store/auth';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { createApi } from '@/helpers/api';

import DefaultLayout from '@/layouts/default.vue';
import TheExpress from '@/components/TheExpress/index.vue';

const route = useRoute();
const router = useRouter();

const quotesStore = useExpressStore();
const authStore = useAuthStore();

const token = localStorage.getItem('token');

const defaultView = computed(() => {
  return route.name !== 'Login'
})

const removeItem = (id: number) => {
  quotesStore.removeFromExpress(id);
}

const userAuthorized = computed(() => {
  return !!authStore.token;
})

if (token) {
  createApi(token);
  authStore.setToken(token);
} else {
  router.replace('/login');
}
</script>

<template>
  <div class="app">
    <DefaultLayout v-if="defaultView">
      <router-view />
    </DefaultLayout>

    <router-view v-else />

    <TheExpress
      v-if="quotesStore.express.length && userAuthorized"
      :express="quotesStore.express"
      class="app__express"
      @removeItem="removeItem"
    />
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;

  &__express {
    position: fixed;
    left: 10px;
    bottom: 65px;
  }
}
</style>
