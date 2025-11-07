export interface Notification {
  id_notificacion: number;
  id_usuario: number;
  id_categoria: number;
  mensaje: string;
  monto: number;
  pagado: boolean;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA';
  fecha_vencimiento: string;
}

export const mockNotifications: Notification[] = [
  {
    id_notificacion: 1,
    id_usuario: 1,
    id_categoria: 3,
    mensaje: 'Factura de luz - EDES',
    monto: 12000,
    fecha_vencimiento: '2025-10-20',
    pagado: false,
    prioridad: 'ALTA',
  },
  {
    id_notificacion: 2,
    id_usuario: 1,
    id_categoria: 4,
    mensaje: 'Factura de gas - Camuzzi',
    monto: 8500,
    fecha_vencimiento: '2025-10-25',
    pagado: false,
    prioridad: 'MEDIA',
  },
  {
    id_notificacion: 3,
    id_usuario: 1,
    id_categoria: 3,
    mensaje: 'Abono de internet - Fibertel',
    monto: 9000,
    fecha_vencimiento: '2025-10-28',
    pagado: false,
    prioridad: 'MEDIA',
  },
  {
    id_notificacion: 4,
    id_usuario: 1,
    id_categoria: 3,
    mensaje: 'Expensas del departamento',
    monto: 25000,
    fecha_vencimiento: '2025-10-30',
    pagado: false,
    prioridad: 'ALTA',
  },
  {
    id_notificacion: 5,
    id_usuario: 1,
    id_categoria: 4,
    mensaje: 'Seguro del auto',
    monto: 18000,
    fecha_vencimiento: '2025-11-05',
    pagado: false,
    prioridad: 'MEDIA',
  },
  {
    id_notificacion: 6,
    id_usuario: 1,
    id_categoria: 1,
    mensaje: 'Servicio de streaming (Netflix)',
    monto: 4500,
    fecha_vencimiento: '2025-10-18',
    pagado: true,
    prioridad: 'BAJA',
  },
];
