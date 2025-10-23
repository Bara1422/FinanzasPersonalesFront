import type { CategorySummary } from '@/lib/getCategorySummaryMock';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';

interface CategoryTableBodyProps {
  category: CategorySummary;
  tipo: 'GASTO' | 'INGRESO';
}

export const CategoryTableBody = ({
  category,
  tipo,
}: CategoryTableBodyProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="font-medium">{category.nombre}</span>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <Badge variant="outline">{category.cantidad}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-3">
          <span
            className={`font-medium ${tipo === 'GASTO' ? 'text-red-500' : 'text-green-500'}`}
          >
            ${category.totalPorCategoria.toFixed(2)}
          </span>
        </div>
      </TableCell>
      {/*  <TableCell>
        <EditDeleteButtons />
      </TableCell> */}
    </TableRow>
  );
};
