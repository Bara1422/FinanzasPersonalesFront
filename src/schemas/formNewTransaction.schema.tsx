import { z } from 'zod';
import { getAllCategories } from '@/lib/getAllCategories';

const CATEGORIAS_VALIDAS = getAllCategories().map(
  (category) => category.nombre,
);

export const formNewTransactionSchema = z.object({
  tipo: z.enum(['INGRESO', 'GASTO'], { message: 'Tipo inválido' }),
  descripcion: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(100, 'La descripción no puede exceder los 100 caracteres'),
  monto: z
    .number('El monto debe ser un número')
    .positive('El monto debe ser un número positivo'),
  categoria: z.enum(CATEGORIAS_VALIDAS),
});
