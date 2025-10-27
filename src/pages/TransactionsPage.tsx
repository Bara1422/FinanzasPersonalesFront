import { useState } from 'react';
import { TransactionCards } from '@/features/transactions/components/TransactionCards';
import { TransactionsFilter } from '@/features/transactions/components/TransactionsFilter';
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { TransactionTitle } from '@/features/transactions/components/TransactionTitle';
import { TransactionsDialog } from '@/features/transactions/dialog/TransactionsDialog';
import { useTransactionsData } from '@/features/transactions/hooks/useTransactionsData';
import { useTransactionsFilters } from '@/features/transactions/hooks/useTransactionsFilters';
import type { Transaction } from '@/mocks/transaccion.mock';

export const TransactionsPage = () => {
  const {
    totalIncome,
    totalExpense,
    balance,
    transactions,
    categoriesMap,
    categoriesNames,
    handleTransactions,
  } = useTransactionsData(1);

  const {
    filterType,
    filterCategory,
    visibleTransactions,
    handleFilterCategoryChange,
    handleFilterTypeChange,
  } = useTransactionsFilters({ transactions, categoriesMap });

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [edittingTransaction, setEdittingTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const handleOpenDialog = (open: boolean) => {
    setIsOpenDialog(open);
  };

  const handleEdit = (transaction: Transaction) => {
    setEdittingTransaction(transaction);
    setIsOpenDialog(true);
  };

  const handleCreate = () => {
    setEdittingTransaction(undefined);
    setIsOpenDialog(true);
  };

  const handleDelete = (transactionId: number) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id_transaccion !== transactionId,
    );
    handleTransactions(updatedTransactions);
    console.log('Eliminar transacción con ID:', transactionId);
  };

  const handleSave = (transaction: Transaction) => {
    if (edittingTransaction) {
      const updatedTransactions = transactions.map((t) =>
        t.id_transaccion === transaction.id_transaccion ? transaction : t,
      );
      handleTransactions(updatedTransactions);
    } else {
      const updatedTransactions = [...transactions, transaction];
      handleTransactions(updatedTransactions);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <TransactionTitle handleOpenDialog={handleCreate} />

      {/* Cards */}
      <TransactionCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      {/* Filters */}
      <TransactionsFilter
        categoriesNames={categoriesNames}
        filterType={filterType}
        filterCategory={filterCategory}
        categoriesFilter={handleFilterCategoryChange}
        typeFilter={handleFilterTypeChange}
      />

      {/* Transaction Table */}
      <TransactionsTable
        visibleTransactions={visibleTransactions}
        categoriesMap={categoriesMap}
        transactions={transactions}
        open={isOpenDialog}
        handleOpenDialog={handleOpenDialog}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Transaction Dialog */}
      <TransactionsDialog
        open={isOpenDialog}
        transaction={edittingTransaction}
        handleOpenDialog={handleOpenDialog}
        onSave={handleSave}
      />
    </div>
  );
};
