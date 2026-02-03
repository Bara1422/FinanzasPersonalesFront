import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiAxios } from '@/config/axios';
import { useGenerateReport } from '../../hooks/useReports';

vi.mock('@/config/axios', () => ({
  apiAxios: { get: vi.fn() },
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('useGenerateReport - descarga segun type/format', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('descarga PDF: reporte_{type}.pdf', async () => {
    (apiAxios.get as any).mockResolvedValue({
      data: new Blob(['x'], { type: 'application/pdf' }),
      headers: {},
    });

    vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    const appendSpy = vi.spyOn(document.body, 'appendChild');

    const { result } = renderHook(() => useGenerateReport(), { wrapper });

    appendSpy.mockClear();

    result.current.mutate({ type: 'transacciones', format: 'pdf' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const a = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(a.tagName).toBe('A');
    expect(a.download).toContain('reporte_transacciones');
    expect(a.download).toContain('.pdf');
  });

  it('descarga EXCEL: reporte_{type}.xlsx', async () => {
    (apiAxios.get as any).mockResolvedValue({
      data: new Blob(['x'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      headers: {},
    });

    vi.spyOn(window.URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    const appendSpy = vi.spyOn(document.body, 'appendChild');

    const { result } = renderHook(() => useGenerateReport(), { wrapper });

    appendSpy.mockClear();

    result.current.mutate({ type: 'notificaciones', format: 'excel' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const a = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(a.tagName).toBe('A');
    expect(a.download).toContain('reporte_notificaciones');
    expect(a.download).toContain('.xlsx');
  });
});
