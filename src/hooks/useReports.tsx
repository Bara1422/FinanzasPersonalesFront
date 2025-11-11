import { useMutation } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios';

interface GenerateReportParams {
  type: string;
  format: 'pdf' | 'excel';
}

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: async ({ type, format }: GenerateReportParams) => {
      const response = await apiAxios.get('/reportes/generar', {
        params: {
          type,
          format,
        },
        responseType: 'blob',
      });

      //  Extraer nombre del archivo desde el header
      const contentDisposition = response.headers['content-disposition'];
      let fileName = `reporte_${type}.${format === 'excel' ? 'xlsx' : 'pdf'}`;

      // Extraer el nombre del archivo si está en el header
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
        );
        if (fileNameMatch?.[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, '');
        }
      }

      return {
        blob: response.data,
        fileName,
      };
    },
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
};
