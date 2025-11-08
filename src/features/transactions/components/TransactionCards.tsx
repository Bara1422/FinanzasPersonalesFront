import { Spinner } from '@/components/ui/spinner';
import { useBalance } from '@/hooks/useBalance';
import { TransactionsCardInfo } from './TransactionsCardInfo';

export const TransactionCards = () => {
  const {
    data: balanceData,
    error: balanceError,
    status: balanceStatus,
  } = useBalance();

  if (!balanceData && balanceStatus === 'pending') {
    return <Spinner className="size-8" />;
  }

  if (balanceError) {
    return <div>Error al cargar el balance</div>;
  }

  if (!balanceData) {
    return <div>No hay datos de balance disponibles</div>;
  }

  const totalIncome = balanceData?.resumenTotal.ingresos;
  const totalExpense = balanceData?.resumenTotal.gastos;
  const totalBalance = balanceData?.resumenTotal.balance;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <TransactionsCardInfo
        title="Total Ingresos"
        amount={totalIncome}
        tipo="INGRESO"
      />
      <TransactionsCardInfo
        title="Total Gastos"
        amount={totalExpense}
        tipo="GASTO"
      />
      <TransactionsCardInfo
        title="Balance Total"
        amount={totalBalance}
        tipo="BALANCE"
      />
    </div>
  );
};
