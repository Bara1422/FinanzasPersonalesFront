type CategoryType = 'INGRESO' | 'GASTO';

export type Category = {
  id_categoria: number;
  nombre: string;
  tipo: CategoryType;
};
