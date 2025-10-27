import { getAmountInfo } from '@/lib/getAmmountInfo';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export const TransactionsCardInfo = ({
  title,
  amount,
  tipo,
}: {
  title: string;
  amount: number;
  tipo: 'INGRESO' | 'GASTO' | 'BALANCE';
}) => {
  const { color, formattedAmount } = getAmountInfo({ amount, tipo });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{formattedAmount}</div>
      </CardContent>
    </Card>
  );
};
