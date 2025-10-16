import { PageTitle } from "@/components/common/PageTitle";

export const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Transacciones"
        subtitle="Gestiona todos tus ingresos y gastos"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
