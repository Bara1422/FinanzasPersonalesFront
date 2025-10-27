import { CheckCircle } from "lucide-react";

export const NoPendingNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No hay gastos pendientes</h3>
      <p className="text-muted-foreground">Todos los gastos estan al dia</p>
    </div>
  );
};
