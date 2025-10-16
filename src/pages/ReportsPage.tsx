import { PageTitle } from '@/components/common/PageTitle';

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Reportes Financieros"
        subtitle="Analiza tus finanzas con reportes detallados"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
