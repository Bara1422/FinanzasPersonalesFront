import { Search } from 'lucide-react';
import { CardHeaderCustom } from '@/components/forms/CardHeaderCustom';
import type { Category } from '@/mocks/category.mock';
import {
  Card,
  CardContent,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

interface Props {
  typeFilter: (value: string) => void;
  categoriesFilter: (value: string) => void;
  filterType: string;
  filterCategory: string;
  categoriesNames: Category[];
}

export const TransactionsFilter = ({
  typeFilter,
  categoriesFilter,
  filterType,
  filterCategory,
  categoriesNames,
}: Props) => {
  const filteredCategories =
    filterType === 'INGRESO'
      ? categoriesNames.filter((category) => category.tipo === 'INGRESO')
      : filterType === 'GASTO'
        ? categoriesNames.filter((category) => category.tipo === 'GASTO')
        : categoriesNames;

  return (
    <Card>
      <CardHeaderCustom
        title="Filtros"
        description="Busca y filtra tus transacciones"
      />
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por descripción..." className="pl-10" />
          </div>
          <Select
            value={filterType}
            onValueChange={(filterType) => typeFilter(filterType)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="ingreso">Ingresos</SelectItem>
              <SelectItem value="gasto">Gastos</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterCategory}
            onValueChange={(filterCategory) => categoriesFilter(filterCategory)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              {filterType === 'todos'
                ? ['INGRESO', 'GASTO'].map((tipo) => (
                    <SelectGroup key={tipo}>
                      <SelectLabel>
                        {tipo === 'INGRESO' ? 'Ingresos' : 'Gastos'}
                      </SelectLabel>
                      {categoriesNames
                        .filter((category) => category.tipo === tipo)
                        .map((categoryName) => (
                          <SelectItem
                            key={categoryName.nombre}
                            value={categoryName.id_categoria.toString()}
                          >
                            {categoryName.nombre}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  ))
                : filteredCategories.map((categoryName) => (
                    <SelectItem
                      key={categoryName.nombre}
                      value={categoryName.id_categoria.toString()}
                    >
                      {categoryName.nombre}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
