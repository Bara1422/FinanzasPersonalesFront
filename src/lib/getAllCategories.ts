import { type Category, mockCategories } from '@/mocks/category.mock';

export const getAllCategories: () => Category[] = () => {
  return mockCategories.map((category) => ({
    id_categoria: category.id_categoria,
    nombre: category.nombre,
    tipo: category.tipo,
  }));
};

export const getCategoriesNames: () => string[] = () => {
  return mockCategories.map((category) => category.nombre);
};
