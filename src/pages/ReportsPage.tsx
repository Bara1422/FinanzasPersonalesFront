import { Download, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { PageTitle } from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGenerateReport } from '@/hooks/useReports';
import { useAuthStore } from '@/store/authStore';

export const ReportsPage = () => {
  const [selectedFormats, setSelectedFormats] = useState<
    Record<string, 'pdf' | 'excel'>
  >({});

  const { mutate: generateReporte } = useGenerateReport();
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

    generateReporte(
      { type: reportId, format },
      {
        onSuccess: () => {
          toast.success('Reporte descargado con éxito');
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || 'Error al generar el reporte',
          );
        },
      },
    );
  };

  const allReports = [
    {
      id: 'usuario',
      title: 'Reporte por Usuario',
      description: 'Información detallada de tu perfil y actividad',
      isAdminOnly: false,
    },
    {
      id: 'categorias',
      title: 'Reporte de Gastos por Categorías',
      description: 'Análisis de gastos organizados por categoría',
      isAdminOnly: false,
    },
    /* {
      id: 'shopping-lists',
      title: 'Reporte de Listas de Compras',
      description: 'Historial y estadísticas de tus listas de compras',
    }, */
    {
      id: 'transacciones',
      title: 'Reporte de Transacciones',
      description: 'Registro completo de ingresos y gastos',
      isAdminOnly: false,
    },
    {
      id: 'notificaciones',
      title: 'Reporte de Notificaciones',
      description: 'Gastos programados y vencimientos',
      isAdminOnly: false,
    },
    {
      id: 'todos_usuarios',
      title: 'Reporte de Todos los Usuarios',
      description: 'Resumen financiero de todos los usuarios (ADMIN)',
      isAdminOnly: true,
    },
  ];

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
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Select
                  defaultValue="pdf"
                  onValueChange={(value: 'pdf' | 'excel') =>
                    handleFormatChange(report.id, value)
                  }
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => handleGenerateReport(report.id)}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Generar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
