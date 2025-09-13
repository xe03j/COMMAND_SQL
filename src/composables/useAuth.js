// src/composables/useAuth.js
import { ref } from 'vue';

const token = ref(localStorage.getItem('access_token'));

const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('access_token', newToken);
};

const clearToken = () => {
    token.value = null;
    localStorage.removeItem('access_token');
};

export function useAuth() {
    return {
        token,
        setToken,
        clearToken
    };
}
