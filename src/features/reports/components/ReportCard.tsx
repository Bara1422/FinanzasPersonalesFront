import { Download, FileText } from 'lucide-react';
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
import type { Report } from '@/types/report.types';

interface Props {
  handleFormatChange: (reportId: string, format: 'pdf' | 'excel') => void;
  handleGenerateReport: (reportId: string) => void;
  report: Report;
}

export const ReportCard = ({
  report,
  handleFormatChange,
  handleGenerateReport,
}: Props) => {
  return (
    <Card>
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
  );
};
