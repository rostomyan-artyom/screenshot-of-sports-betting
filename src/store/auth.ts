import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const token = ref('');
  
  function setToken(authToken: string) {
    token.value = `${authToken}`;
    localStorage.setItem('token', `${authToken}`);
  }

  function logout() {
    token.value = '';
    localStorage.removeItem('token');
    router.replace('/login');
  }

  return { token, setToken, logout };
})