import type { CategorySummary } from '@/lib/getCategorySummaryMock';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { CategoryTableBody } from './CategoryTableBody';

export const CardCategoryPage = ({
  categorySummary,
  tipo,
}: {
  categorySummary: CategorySummary[];
  tipo: 'GASTO' | 'INGRESO';
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-center">Transacciones</TableHead>
          <TableHead className="text-right">Total</TableHead>
          {/*  <TableHead className="text-right">Acciones</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {categorySummary.map((category) => (
          <CategoryTableBody
            key={category.id_category}
            category={category}
            tipo={tipo}
          />
        ))}
      </TableBody>
    </Table>
  );
};
