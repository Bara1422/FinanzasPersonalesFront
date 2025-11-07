import { useEffect, useState } from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardCards } from '@/features/dashboard/components/DashboardCards';
import { DashboardCategoriesTable } from '@/features/dashboard/components/DashboardCategoriesTable';
import { DashboardNotificationsCard } from '@/features/dashboard/components/DashboardNotificationsCard';
import { DashboardTransactionsTable } from '@/features/dashboard/components/DashboardTransactionsTable';

import { useAuthStore } from '@/store/authStore';

export const DashboardPage = () => {
  const { usuario, isHydrated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos
    if (isHydrated) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isHydrated]);

  if (!isHydrated || isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
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
