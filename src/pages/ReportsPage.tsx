import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { PageTitle } from '@/components/common/PageTitle';
import { ReportCard } from '@/features/reports/components/ReportCard';
import { allReports } from '@/features/reports/utils/allReports';
import { useGenerateReport } from '@/hooks/useReports';
import { useAuthStore } from '@/store/authStore';

export const ReportsPage = () => {
  const [selectedFormats, setSelectedFormats] = useState<
    Record<string, 'pdf' | 'excel'>
  >({});

  const { mutate: generateReporte, isPending } = useGenerateReport();
  const usuario = useAuthStore((state) => state.usuario);
  const isAdmin = usuario?.rol === 'ADMIN';

  const handleFormatChange = (reportId: string, format: 'pdf' | 'excel') => {
    setSelectedFormats((prev) => ({
      ...prev,
      [reportId]: format,
    }));
  };

  const handleGenerateReport = (reportId: string) => {
    const format = selectedFormats[reportId] || 'pdf';
    const toastId = toast.loading('Generando reporte...');
    generateReporte(
      { type: reportId, format },
      {
        onSuccess: () => {
          toast.success('Reporte descargado con éxito', { id: toastId });
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || 'Error al generar el reporte',
            { id: toastId },
          );
        },
      },
    );
  };

  const reports = useMemo(() => {
    return allReports.filter((report) => {
      if (report.isAdminOnly) {
        return isAdmin;
      }
      return true;
    });
  }, [isAdmin]);

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <PageTitle
        title="Reportes Financieros"
        subtitle="Analiza tus finanzas con reportes detallados"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            handleFormatChange={handleFormatChange}
            handleGenerateReport={handleGenerateReport}
            isLoading={isPending}
          />
        ))}
      </div>
    </div>
  );
};
