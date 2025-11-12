export interface BalanceData {
  transacciones: TransaccionesData[];
  resumenMensual: Resumen;
  resumenTotal: Resumen;
  cantidadTransacciones: number;
}

export interface Resumen {
  ingresos: number;
  gastos: number;
  balance: number;
}

export interface TransaccionesData {
  id_transaccion: number;
  id_usuario: number;
  id_categoria: number;
  monto: number;
  descripcion: string;
  fecha: string;
}
