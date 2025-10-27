export type Transaction = {
  id_transaccion: number;
  id_usuario: number;
  id_categoria: number;
  monto: number;
  descripcion: string;
  fecha: string;
};

export const mockTransactions: Transaction[] = [
  {
    id_transaccion: 1,
    id_usuario: 1,
    id_categoria: 1, // Alimentos
    monto: 2500,
    descripcion: 'Compra supermercado',
    fecha: '2025-10-01',
  },
  {
    id_transaccion: 2,
    id_usuario: 1,
    id_categoria: 2, // Transporte
    monto: 800,
    descripcion: 'Nafta',
    fecha: '2025-10-03',
  },
  {
    id_transaccion: 3,
    id_usuario: 1,
    id_categoria: 1, // Alimentos
    monto: 1200,
    descripcion: 'Restaurante',
    fecha: '2025-10-04',
  },
  {
    id_transaccion: 4,
    id_usuario: 1,
    id_categoria: 8, // Tecnología
    monto: 6000,
    descripcion: 'Mouse gamer',
    fecha: '2025-10-06',
  },
  {
    id_transaccion: 5,
    id_usuario: 2,
    id_categoria: 3, // Vivienda
    monto: 20000,
    descripcion: 'Alquiler',
    fecha: '2025-10-02',
  },
  {
    id_transaccion: 6,
    id_usuario: 2,
    id_categoria: 1, // Alimentos
    monto: 5000,
    descripcion: 'Supermercado',
    fecha: '2025-10-03',
  },
  {
    id_transaccion: 7,
    id_usuario: 1,
    id_categoria: 11, // Sueldo
    monto: 5000,
    descripcion: 'Sueldo mensual',
    fecha: '2025-10-01',
  },
];
