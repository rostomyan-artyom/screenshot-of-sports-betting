<script lang="ts">
export default {
  name: 'LoginView',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { loginRequest } from '@/api/auth';
import { createApi } from '@/helpers/api';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  login: null,
  password: null,
})

const onClickLogin = async () => {
  try {
    const { data } = await loginRequest(form.value);

    if (data.token) {
      authStore.setToken(data.token);
      createApi(data.token);

      const redirectedFrom = localStorage.getItem('redirectedFrom');
      localStorage.removeItem('redirectedFrom');
      router.push(redirectedFrom ? redirectedFrom : '/');
    }
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-view__form">
      <div class="login-view__title">
        Авторизация
      </div>

      <div class="login-view__description">
        Введите любые данные
      </div>

      <ui-textfield
        v-model="form.login"
        outlined
        class="mb-2"
        @keydown.enter="onClickLogin"
      >
        Логин
      </ui-textfield>
      <ui-textfield
        v-model="form.password"
        input-type="password"
        outlined
        class="mb-2"
        @keydown.enter="onClickLogin"
      >
        Пароль
      </ui-textfield>

      <ui-button
        type="raised"
        class="w-100"
        @click="onClickLogin"
      >
        Войти
      </ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  width: 100%;

  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 7px;
  }

  &__description {
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    color: rgb(86, 86, 86);
    margin-bottom: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
