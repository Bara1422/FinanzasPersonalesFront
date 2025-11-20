import { PageTitle } from '@/components/common/PageTitle';
import { Spinner } from '@/components/ui/spinner';
import { DashboardCards } from '@/features/dashboard/components/DashboardCards';
import { DashboardCategoriesTable } from '@/features/dashboard/components/DashboardCategoriesTable';
import { DashboardNotificationsCard } from '@/features/dashboard/components/DashboardNotificationsCard';
import { DashboardTransactionsTable } from '@/features/dashboard/components/DashboardTransactionsTable';
import { useAuthStore } from '@/store/authStore';

export const DashboardPage = () => {
  const { usuario, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return <Spinner className="size-8" />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1">
        <PageTitle
          title={`¡Bienvenido, ${usuario?.nombre}! `}
          subtitle="Resumen de tus finanzas personales"
        />
      </div>

      {/* Initial cards */}
      <DashboardCards />

      {/* Main Content Grid */}
      <div className="space-y-6">
        {/* Transacciones Recientes */}
        <DashboardTransactionsTable />
        <div className="grid grid-cols-2 gap-2">
          {/* Gastos por Categoría */}
          <DashboardCategoriesTable />
          <DashboardNotificationsCard />
        </div>
      </div>
    </div>
  );
};
