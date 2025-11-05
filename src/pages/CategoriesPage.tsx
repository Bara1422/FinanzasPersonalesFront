import { Navigate } from 'react-router';
import { PageTitle } from '@/components/common/PageTitle';
import { GastosIngresosCard } from '@/features/categories/Gastos-IngresosCard';
import { getCategorySummaryMock } from '@/lib/getCategorySummaryMock';
import { useAuthStore } from '@/store/authStore';

export const CategoriesPage = () => {
  const token = useAuthStore((state) => state.token);

  const categorySummary = getCategorySummaryMock(1);
  const gastos = categorySummary.filter((item) => item.tipo === 'GASTO');
  const ingresos = categorySummary.filter((item) => item.tipo === 'INGRESO');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <PageTitle
        title="Categorías"
        subtitle="Organiza y controla tus gastos por categorías"
      />

      {/* Cards ingresos y gastos */}
      <GastosIngresosCard
        categorySummary={gastos}
        title="Categorías de Gastos"
        tipo="GASTO"
        description="Presupuesto y gastos por categoría"
      />
      <GastosIngresosCard
        categorySummary={ingresos}
        tipo="INGRESO"
        title="Categorías de Ingresos"
        description="Fuente de ingresos"
      />
    </div>
  );
};
