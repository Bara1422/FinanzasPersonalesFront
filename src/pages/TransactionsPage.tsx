import { useCallback, useState } from 'react';
import { TransactionCards } from '@/features/transactions/components/TransactionCards';
import { TransactionsFilter } from '@/features/transactions/components/TransactionsFilter';
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { TransactionTitle } from '@/features/transactions/components/TransactionTitle';
import { TransactionsDialog } from '@/features/transactions/dialog/TransactionsDialog';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { useTransactionsFilters } from '@/features/transactions/hooks/useTransactionsFilters';
import type { Transaction } from '@/types/transaction.types';


export const TransactionsPage = () => {
  const { data: transactions = [] } = useTransactions();

  const {
    filterType,
    filterCategory,
    searchTerm,
    filteredTransactions,
    handleFilterCategoryChange,
    handleFilterTypeChange,
    handleSearchTermChange,
  } = useTransactionsFilters(transactions);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [edittingTransaction, setEdittingTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const handleOpenDialog = useCallback((open: boolean) => {
    if (!open) {
      setEdittingTransaction(undefined);
    }
    setIsOpenDialog(open);
  }, []);

  const handleEdit = useCallback((transaction: Transaction) => {
    setEdittingTransaction(transaction);
    setIsOpenDialog(true);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <TransactionTitle handleOpenDialog={handleOpenDialog} />

      {/* Cards */}
      <TransactionCards />

      {/* Filters */}
      <TransactionsFilter
      searchTerm={searchTerm}
      handleSearchTermChange={handleSearchTermChange}
        filterType={filterType}
        filterCategory={filterCategory}
        categoriesFilter={handleFilterCategoryChange}
        typeFilter={handleFilterTypeChange}
      />

      {/* Transaction Table */}
      <TransactionsTable
      filteredTransactions={filteredTransactions}
        open={isOpenDialog}
        handleOpenDialog={handleOpenDialog}
        onEdit={handleEdit}
        filterType={filterType}
        filterCategory={filterCategory}
      />

      {/* Transaction Dialog */}
      <TransactionsDialog
        open={isOpenDialog}
        transaction={edittingTransaction}
        handleOpenDialog={handleOpenDialog}
      />
    </div>
  );
};
