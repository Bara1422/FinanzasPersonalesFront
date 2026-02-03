import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import { useAuthStore } from '@/store/authStore';
import {
  useNotifications,
  useNotificationsPaid,
  useNotificationsPending,
} from '../../features/notifications/hooks/useNotifications';

vi.mock('@/config/axios', () => ({
  apiAxios: { get: vi.fn() },
}));

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

const apiNotification = {
  id_notificacion: 1,
  id_usuario: 10,
  id_categoria: 2,
  descripcion: 'Internet',
  monto: 5000,
  fecha_vencimiento: '2026-02-10T00:00:00.000Z',
  prioridad: 'ALTA',
  pagado: false,
};

describe('hooks notifications - queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAuthStore as any).mockImplementation((selector: any) =>
      selector({ usuario: { id_usuario: 10 } }),
    );
  });

  it('useNotifications: llama /notificaciones y convierte fecha_vencimiento a Date', async () => {
    (apiAxios.get as any).mockResolvedValue({ data: [apiNotification] });

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('success'));
    await waitFor(() => expect(result.current.data?.length).toBeGreaterThan(0));

    expect(apiAxios.get).toHaveBeenCalledWith('/notificaciones');
    expect(result.current.data?.[0].fecha_vencimiento).toBeInstanceOf(Date);
  });

  it('useNotificationsPending: llama /notificaciones/pending y convierte fecha_vencimiento a Date', async () => {
    (apiAxios.get as any).mockResolvedValue({ data: [apiNotification] });

    const { result } = renderHook(() => useNotificationsPending(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('success'));
    await waitFor(() => expect(result.current.data?.length).toBeGreaterThan(0));

    expect(apiAxios.get).toHaveBeenCalledWith('/notificaciones/pending');
    expect(result.current.data?.[0].fecha_vencimiento).toBeInstanceOf(Date);
  });

  it('useNotificationsPaid: llama /notificaciones/paid y convierte fecha_vencimiento a Date', async () => {
    (apiAxios.get as any).mockResolvedValue({ data: [apiNotification] });

    const { result } = renderHook(() => useNotificationsPaid(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('success'));
    await waitFor(() => expect(result.current.data?.length).toBeGreaterThan(0));

    expect(apiAxios.get).toHaveBeenCalledWith('/notificaciones/paid');
    expect(result.current.data?.[0].fecha_vencimiento).toBeInstanceOf(Date);
  });
});
