import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Login from '@/pages/Login';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    ),
  };
});

vi.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    usuario: null,
    token: null,
  }),
}));

describe('Login page', () => {
  it('renderiza el formulario de login', () => {
    render(<Login />);

    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
});
