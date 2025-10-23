import { Edit, Trash2 } from 'lucide-react';
import type { CategorySummary } from '@/lib/getCategorySummaryMock';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
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
      <TableCell>
        <Badge variant="outline">{category.cantidad}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <span
            className={`font-medium ${tipo === 'GASTO' ? 'text-red-500' : 'text-green-500'}`}
          >
            ${category.totalPorCategoria.toFixed(2)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-accent-foreground/10"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-accent-foreground/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
