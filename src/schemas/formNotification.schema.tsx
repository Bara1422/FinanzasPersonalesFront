import { z } from 'zod';

export const notificationSchema = z.object({
  descripcion: z.string().min(1, { message: 'El mensaje es requerido' }),
  monto: z.number().min(1, { message: 'El monto debe ser mayor a 0' }),
  prioridad: z.enum(['BAJA', 'MEDIA', 'ALTA'], {
    message: 'Selecciona una prioridad válida',
  }),

  fecha_vencimiento: z
    .string()
    .min(1, { message: 'La fecha de vencimiento es requerida' })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: 'La fecha de vencimiento no puede ser anterior a hoy',
      },
    ),
  id_categoria: z
    .number()
    .min(1, { message: 'Selecciona una categoría válida' }),
});
