/* import axios from 'axios'; */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/mocks/user.mock';

interface AuthState {
  usuario: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      login: async (email: string, password: string) => {
        /*  const data = await axios
          .post('http://localhost:3000/auth/login', { email, password })
          .then((response) => response.data);
        set({ usuario: data.usuario, token: data.token }); */
        const { user, token } = await import('@/mocks/login.mock').then(
          ({ loginMock }) => loginMock(email, password),
        );
        set({ usuario: user, token });
      },
      logout: () => set({ usuario: null, token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
