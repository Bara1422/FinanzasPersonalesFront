import {
  ArrowRightLeft,
  Calculator,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useBalance } from '@/hooks/useBalance';
import { DashboardCardInfo } from './DashboardCardInfo';

export const DashboardCards = () => {
  const {
    data: summary,
    status: transactionsStatus,
    isLoading: isLoadingBalance,
    error: errorSummary,
  } = useBalance();

  if (isLoadingBalance) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (transactionsStatus === 'pending') {
    return <Spinner className="size-8" />;
  }

  if (transactionsStatus === 'error' || errorSummary || !summary) {
    return (
      <div className="text-center text-red-600 py-8">
        Error al cargar el resumen financiero
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <DashboardCardInfo
        icon={<Calculator className="h-5 w-5" />}
        title="Balance Total"
        amount={summary?.resumenTotal.balance}
        tipo="BALANCE"
      />
      <DashboardCardInfo
        icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        title="Total Ingresos"
        amount={summary?.resumenTotal.ingresos}
        tipo="INGRESO"
      />
      <DashboardCardInfo
        icon={<TrendingDown className="h-5 w-5 text-red-500" />}
        title="Total Gastos"
        amount={summary?.resumenTotal.gastos}
        tipo="GASTO"
      />
      <DashboardCardInfo
        icon={<ArrowRightLeft className="h-5 w-5" />}
        title="Transacciones"
        amount={summary?.cantidadTransacciones}
        tipo="TRANSACCION"
      />
    </div>
  );
};
