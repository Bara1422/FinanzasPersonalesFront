import { GastosIngresosCard } from '@/components/categories/Gastos-IngresosCard';
import { PageTitle } from '@/components/common/PageTitle';
import { getCategorySummaryMock } from '@/lib/getCategorySummaryMock';

export const CategoriesPage = () => {
  const categorySummary = getCategorySummaryMock();
  const gastos = categorySummary.filter((item) => item.tipo === 'GASTO');
  const ingresos = categorySummary.filter((item) => item.tipo === 'INGRESO');
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
