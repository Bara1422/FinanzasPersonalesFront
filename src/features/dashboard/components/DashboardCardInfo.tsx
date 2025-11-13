import { getAmountInfo } from '@/lib/getAmmountInfo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

export const DashboardCardInfo = ({
  title,
  amount,
  tipo,
  icon,
}: {
  title: string;
  amount: number;
  tipo: 'INGRESO' | 'GASTO' | 'BALANCE' | 'TRANSACCION';
  icon?: React.ReactNode;
}) => {
  const { color, formattedAmount } = getAmountInfo({ amount, tipo });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{formattedAmount}</div>
      </CardContent>
    </Card>
  );
};
