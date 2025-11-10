import { Download, FileText } from 'lucide-react';
import { useState } from 'react';
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

export const ReportsPage = () => {
  const [selectedFormats, setSelectedFormats] = useState<
    Record<string, 'pdf' | 'xls'>
  >({});

  const handleFormatChange = (reportId: string, format: 'pdf' | 'xls') => {
    setSelectedFormats((prev) => ({
      ...prev,
      [reportId]: format,
    }));
  };

  const handleGenerateReport = (reportId: string, reportTitle: string) => {
    const format = selectedFormats[reportId] || 'pdf';
    console.log(`Generando ${reportTitle} en formato ${format}`);
    // aca tengo que hacer la logica con backend para que funcione la descarga
  };

  const reports = [
    {
      id: 'user',
      title: 'Reporte por Usuario',
      description: 'Información detallada de tu perfil y actividad',
    },
    {
      id: 'categories',
      title: 'Reporte de Gastos por Categorías',
      description: 'Análisis de gastos organizados por categoría',
    },
    {
      id: 'shopping-lists',
      title: 'Reporte de Listas de Compras',
      description: 'Historial y estadísticas de tus listas de compras',
    },
    {
      id: 'transactions',
      title: 'Reporte de Transacciones',
      description: 'Registro completo de ingresos y gastos',
    },
    {
      id: 'notifications',
      title: 'Reporte de Notificaciones',
      description: 'Gastos programados y vencimientos',
    },
  ];

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
                  onValueChange={(value: 'pdf' | 'xls') =>
                    handleFormatChange(report.id, value)
                  }
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="xls">Excel</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => handleGenerateReport(report.id, report.title)}
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
