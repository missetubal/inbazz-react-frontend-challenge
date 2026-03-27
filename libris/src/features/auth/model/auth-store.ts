import { create } from 'zustand';
import { getAuthToken, getAuthUser, login, logout, register } from '../api';
import type { AuthState } from '../types';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initializeAuth: () => {
        const token = getAuthToken();
        const user = getAuthUser();

        if (token && user) {
          set({ user, token, isAuthenticated: true });
        }
      },

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await login({ email, password });
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({
            error:
              err instanceof Error
                ? err.message
                : //need to translate
                  'Erro desconhecido ao efetuar login',
            isLoading: false,
          });
          throw err;
        }
      },

      register: async ({ name, email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await register({ name, email, password });
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({
            error:
              err instanceof Error
                ? err.message
                : 'Erro desconhecido ao realizar registro',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await logout();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (err) {
          set({
            error:
              err instanceof Error
                ? err.message
                : 'Erro desconhecido no logout',
            isLoading: false,
          });
          throw err;
        }
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
