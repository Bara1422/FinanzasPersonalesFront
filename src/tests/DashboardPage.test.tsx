import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DashboardPage } from '@/pages/DashboardPage';

vi.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    usuario: { nombre: 'María' },
    isHydrated: true,
  }),
}));

vi.mock('@/features/dashboard/components/DashboardCards', () => ({
  DashboardCards: () => <div>DashboardCards</div>,
}));

vi.mock('@/features/dashboard/components/DashboardTransactionsTable', () => ({
  DashboardTransactionsTable: () => <div>Transactions</div>,
}));

vi.mock('@/features/dashboard/components/DashboardCategoriesTable', () => ({
  DashboardCategoriesTable: () => <div>Categories</div>,
}));

vi.mock('@/features/dashboard/components/DashboardNotificationsCard', () => ({
  DashboardNotificationsCard: () => <div>Notifications</div>,
}));

describe('DashboardPage', () => {
  it('muestra el saludo de bienvenida con el nombre del usuario', () => {
    render(<DashboardPage />);

    expect(screen.getByText(/bienvenido, maría/i)).toBeInTheDocument();
  });
});
