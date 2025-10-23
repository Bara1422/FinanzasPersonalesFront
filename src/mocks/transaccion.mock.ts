export type Transaction = {
  id_transaccion: string;
  id_usuario: string;
  id_categoria: string;
  tipo: 'INGRESO' | 'GASTO';
  monto: number;
  descripcion: string;
  fecha: string;
};

export const mockTransactions: Transaction[] = [
  {
    id_transaccion: '1',
    id_usuario: '1',
    id_categoria: '1', // Alimentos
    tipo: 'GASTO',
    monto: 2500,
    descripcion: 'Compra supermercado',
    fecha: '2025-10-01',
  },
  {
    id_transaccion: '2',
    id_usuario: '1',
    id_categoria: '2', // Transporte
    tipo: 'GASTO',
    monto: 800,
    descripcion: 'Nafta',
    fecha: '2025-10-03',
  },
  {
    id_transaccion: '3',
    id_usuario: '1',
    id_categoria: '1', // Alimentos
    tipo: 'GASTO',
    monto: 1200,
    descripcion: 'Restaurante',
    fecha: '2025-10-04',
  },
  {
    id_transaccion: '4',
    id_usuario: '1',
    id_categoria: '8', // Tecnología
    tipo: 'GASTO',
    monto: 6000,
    descripcion: 'Mouse gamer',
    fecha: '2025-10-06',
  },
  {
    id_transaccion: '5',
    id_usuario: '2',
    id_categoria: '3', // Vivienda
    tipo: 'GASTO',
    monto: 20000,
    descripcion: 'Alquiler',
    fecha: '2025-10-02',
  },
  {
    id_transaccion: '6',
    id_usuario: '2',
    id_categoria: '1', // Alimentos
    tipo: 'GASTO',
    monto: 5000,
    descripcion: 'Supermercado',
    fecha: '2025-10-03',
  },
  {
    id_transaccion: '7',
    id_usuario: '1',
    id_categoria: '11', // Sueldo
    tipo: 'INGRESO',
    monto: 5000,
    descripcion: 'Sueldo mensual',
    fecha: '2025-10-01',
  },
];
