import type { Report } from "@/types/report.types";

export const allReports: Report[] = [
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
