type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA';

export interface Notification {
  id_notificacion: number;
  id_usuario: number;
  id_categoria: number;
  descripcion: string;
  monto: number;
  fecha_vencimiento: string;
  prioridad: Prioridad;
  pagado: boolean;
}

