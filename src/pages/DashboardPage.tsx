import { PageTitle } from '@/components/common/PageTitle';

export const DashboardPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <PageTitle
        title="Dashboard"
        subtitle="Resumen de tus finanzas personales"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
