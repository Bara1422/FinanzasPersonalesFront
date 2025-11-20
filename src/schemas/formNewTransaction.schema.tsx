import { z } from 'zod';

export const formNewTransactionSchema = z.object({
  tipo: z.enum(['INGRESO', 'GASTO'], { message: 'Tipo inválido' }),
  descripcion: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'La descripción no puede exceder los 100 caracteres'),
  monto: z.number().min(1, { message: 'El monto debe ser mayor a 0' }),
  id_categoria: z
    .number()
    .min(1, { message: 'Selecciona una categoría válida' }),
});
