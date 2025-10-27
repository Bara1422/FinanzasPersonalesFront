import { z } from 'zod';
import { formDateForInput } from '@/lib/formDateForInput';

export const notificationSchema = z.object({
  mensaje: z.string().min(1, { message: 'El mensaje es requerido' }),
  monto: z.number().min(1, { message: 'El monto debe ser mayor a 0' }),
  prioridad: z.enum(['BAJA', 'MEDIA', 'ALTA'], {
    message: 'Selecciona una prioridad válida',
  }),
  fecha_vencimiento: z
    .string()
    .min(1, 'La fecha de vencimiento es requerida')
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: 'La fecha de vencimiento debe ser una fecha válida',
    })
    .refine(
      (value) => {
        const today = formDateForInput(new Date().toISOString());
        return value >= today;
      },
      {
        message: 'La fecha de vencimiento no puede ser anterior a hoy',
      },
    ),
  id_categoria: z
    .number()
    .min(1, { message: 'Selecciona una categoría válida' }),
});
