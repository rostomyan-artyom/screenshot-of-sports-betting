<script lang="ts">
export default {
  name: 'DefaultLayout',
}
</script>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth';
import TheAside from '@/components/common/TheAside.vue';

const pages = [
  {
    id: 0,
    title: 'Футбол',
    path: '/sport-types/football',
    pages: [
      {
        id: 11,
        title: 'Россия',
        path: '/sport-types/football/countries/russia',
        pages: [
          {
            id: 21,
            title: 'Российская Премьер-Лига (РПЛ)',
            path: '/sport-types/football/countries/russia/championships/rpl',
            pages: [
              {
                id: 21,
                title: 'Локоматив - Сочи',
                path: '/quotes/loco-sochi',
              },
              {
                id: 22,
                title: 'ЦСКА - Краснодар',
                path: '/quotes/cska-krasnodar',
              },
            ],
          }
        ],
      },
    ],
  },
  {
    id: 1,
    title: 'Волейбол',
    path: '/sport-types/volleyball',
    pages: [
      {
        id: 12,
        title: 'Мир',
        path: '/sport-types/volleyball/countries/world',
        pages: [
          {
            id: 22,
            title: 'Чемпионат мира',
            path: '/sport-types/volleyball/countries/world/championships/volleyball-world-championship',
            pages: [
              {
                id: 22,
                title: 'Бразилия - Италия',
                path: '/quotes/brazil-italy',
              }
            ]
          }
        ]
      },
    ],
  },
]

const authStore = useAuthStore();
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__aside">
      <TheAside
        :pages="pages"
        class="default-layout__aside-hero"
      />

      <ui-button
        class="mt-2"
        @click="authStore.logout"
      >
        Выйти
      </ui-button>
    </div>


    <div class="default-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;

  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 250px;
    min-width: 250px;
    margin-right: 50px;
    height: 100vh;
    background-color: #feffff;
    padding: 15px 0;
  }

  &__aside-hero {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }

  &__content {
    max-height: 100vh;
    width: 100%;
    overflow: auto;
  }
}
</style>
