import { TransactionsCardInfo } from './TransactionsCardInfo';

interface Props {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export const TransactionCards = ({ totalIncome, totalExpense, balance }: Props) => {
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
        amount={balance}
        tipo="BALANCE"
      />
    </div>
  );
};
