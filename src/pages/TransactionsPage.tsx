import { useState } from 'react';
import { TransactionCards } from '@/components/transactions/cards/TransactionCards';
import { TransactionsDialog } from '@/components/transactions/dialog/TransactionsDialog';
import { TransactionsFilter } from '@/components/transactions/filters/TransactionsFilter';
import { TransactionsTable } from '@/components/transactions/table/TransactionsTable';
import { TransactionTitle } from '@/components/transactions/title/TransactionTitle';
import { useTransactionsData } from '@/hooks/useTransactionsData';
import { useTransactionsFilters } from '@/hooks/useTransactionsFilters';

export const TransactionsPage = () => {
  const {
    totalIncome,
    totalExpense,
    balance,
    transactions,
    categoriesMap,
    categoriesNames,
  } = useTransactionsData(1);

  const {
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    visibleTransactions,
  } = useTransactionsFilters({ transactions, categoriesMap });

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setFilterCategory('todas');
  };

  const handleFilterCategoryChange = (value: string) => {
    setFilterCategory(value);
  };

  const handleOpenDialog = (open: boolean) => {
    setIsOpenDialog(open);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <TransactionTitle handleOpenDialog={handleOpenDialog} />

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
      />

      {/* Transaction Dialog */}
      <TransactionsDialog
        open={isOpenDialog}
        handleOpenDialog={handleOpenDialog}
      />
    </div>
  );
};
