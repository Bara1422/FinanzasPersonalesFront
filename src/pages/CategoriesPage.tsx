import { PageTitle } from "@/components/common/PageTitle";

export const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <PageTitle
        title="Categorías"
        subtitle="Organiza y controla tus gastos por categorías"
      />

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
};
