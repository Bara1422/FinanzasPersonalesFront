import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiAxios } from '@/config/axios';
import type { User } from '@/mocks/user.mock';

interface RegisterData {
  nombre: string;
  email: string;
  username: string;
  password: string;
}

interface AuthState {
  token: string | null;
  id_usuario: number | null;
  usuario: User | null;
  isHydrated?: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      usuario: null,
      token: null,
      id_usuario: null,
      isHydrated: false,

      login: async (email: string, password: string) => {
        try {
          const { data } = await apiAxios.post('/auth/login', {
            email,
            password,
          });
          const { usuario, token } = data;
          set({ token, id_usuario: usuario.id_usuario, usuario });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Error al iniciar sesión';

          throw new Error(errorMessage);
        }
      },

      logout: () => set({ usuario: null, id_usuario: null, token: null }),

      register: async (registerData) => {
        const { data } = await apiAxios.post('/auth/register', registerData);

        const { usuario, token } = data;
        set({ token, id_usuario: usuario.id_usuario, usuario });
      },

      fetchUserData: async () => {
        const { token } = get();

        if (!token) {
          set({ isHydrated: true });
          return;
        }
        //marcar si esta cargando
        set({ isHydrated: false });

        try {
          const { data } = await apiAxios.get('/auth/me');
          set({ usuario: data, isHydrated: true });
        } catch (error) {
          console.log('Error trayendo usuario:', error);
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        id_usuario: state.id_usuario,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isHydrated = false;
        }
      },
    },
  ),
);

window.addEventListener('storage', (event) => {
  if (event.key === 'auth-storage' && event.newValue === null) {
    const { logout } = useAuthStore.getState();
    logout();
  }
});
