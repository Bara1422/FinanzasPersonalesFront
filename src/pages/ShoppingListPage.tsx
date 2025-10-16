import { PageTitle } from '@/components/common/PageTitle';

export const ShoppingListPage = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Listas de Compras"
        subtitle="Gestiona tus listas de compras"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
