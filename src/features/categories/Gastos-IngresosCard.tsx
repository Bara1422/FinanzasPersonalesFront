import { TrendingDown, TrendingUp } from 'lucide-react';
import type { CategorySummary } from '@/lib/getCategorySummary';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { CardCategoryPage } from './CardCategoryPage';

interface Props {
  categorySummary: CategorySummary[];
  title: string;
  description: string;
  tipo: 'GASTO' | 'INGRESO';
}

export const GastosIngresosCard = ({
  categorySummary,
  title,
  description,
  tipo,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {tipo === 'GASTO' ? (
            <TrendingDown className="h-5 w-5 text-red-400" />
          ) : (
            <TrendingUp className="h-5 w-5 text-green-400" />
          )}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardCategoryPage categorySummary={categorySummary} tipo={tipo} />
      </CardContent>
    </Card>
  );
};
