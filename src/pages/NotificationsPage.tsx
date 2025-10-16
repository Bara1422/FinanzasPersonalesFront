import { PageTitle } from '@/components/common/PageTitle';

export const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Notificaciones"
        subtitle="Mantente al día con tus finanzas y recordatorios importantes"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
