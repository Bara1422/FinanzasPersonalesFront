import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import { useUserUpdate } from '../../features/account/hooks/useUser';

vi.mock('@/config/axios', () => ({
  apiAxios: { patch: vi.fn() },
}));

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useUserUpdate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('si no hay usuario autenticado, tira error y no llama patch', async () => {
    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ usuario: null }),
    );

    (useAuthStore as any).getState = () => ({ fetchUserData: vi.fn() });

    const { result } = renderHook(() => useUserUpdate(), { wrapper });

    await expect(
      result.current.mutateAsync({ name: 'Nuevo' } as any),
    ).rejects.toThrow('No hay usuario autenticado');

    expect(apiAxios.patch).not.toHaveBeenCalled();
  });

  it('si hay usuario, llama patch y en success invalida query y llama fetchUserData', async () => {
    const fetchUserDataMock = vi.fn().mockResolvedValue(undefined);

    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ usuario: { id_usuario: 10 } }),
    );
    (useAuthStore as any).getState = () => ({
      fetchUserData: fetchUserDataMock,
    });

    (apiAxios.patch as any).mockResolvedValue({});

    const invalidateSpy = vi.spyOn(QueryClient.prototype, 'invalidateQueries');

    const { result } = renderHook(() => useUserUpdate(), { wrapper });

    await result.current.mutateAsync({ username: 'juan' } as any);

    expect(apiAxios.patch).toHaveBeenCalledWith('/usuarios/10', {
      username: 'juan',
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['user', 10] });
      expect(fetchUserDataMock).toHaveBeenCalled();
    });
  });
});
