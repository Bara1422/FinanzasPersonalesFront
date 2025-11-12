import { Bell } from 'lucide-react';
import { EmptyDataCard } from '@/components/common/EmptyDataCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useNotificationsPending } from '@/features/notifications/hooks/useNotifications';

export const DashboardNotificationsCard = () => {
  const {
    data: pendingNotificaciones,
    status,
    fetchStatus,
    error,
  } = useNotificationsPending();

  if (fetchStatus === 'fetching') {
    return <Spinner className="size-8" />;
  }

  if (status === 'error' || error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error al cargar las notificaciones
      </div>
    );
  }

  if (!pendingNotificaciones || pendingNotificaciones.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <CardTitle>Próximos Vencimientos</CardTitle>
          </div>
          <CardDescription>Pagos y recordatorios pendientes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No hay notificaciones pendientes
          </p>
        </CardContent>
      </Card>
    );
  }

  const notificacionesActivas = pendingNotificaciones.filter((notif) => {
    const fechaActual = new Date();
    return notif.fecha_vencimiento > fechaActual;
  });

  if (notificacionesActivas.length === 0) {
    return (
      <EmptyDataCard
        title="Próximos Vencimientos"
        description="Pagos y recordatorios pendientes"
        text="No hay notificaciones pendientes"
      />
    );
  }

  const getDaysLeft = (daysDiff: number) => {
    if (daysDiff === 0) {
      return { text: 'Vence hoy', color: 'text-red-500' };
    } else {
      return {
        text: `En ${daysDiff} día${daysDiff > 1 ? 's' : ''}`,
        color: 'text-orange-600',
      };
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Próximos Vencimientos</CardTitle>
        <CardDescription>Pagos y recordatorios pendientes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {notificacionesActivas.map((notif) => {
          const fechaActual = new Date();
          const fechaVencimiento = new Date(notif.fecha_vencimiento);
          const diferenciaDias = Math.ceil(
            (fechaVencimiento.getTime() - fechaActual.getTime()) /
              (1000 * 60 * 60 * 24),
          );
          const { text: diasTexto, color: diasColor } =
            getDaysLeft(diferenciaDias);
          return (
            <div
              key={notif.id_notificacion}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-sm">{notif.descripcion}</p>
                <p className="text-xs text-muted-foreground">
                  <span className={`${diasColor} font-semibold`}>
                    {diasTexto}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold">
                  Prioridad {notif.prioridad}
                </span>
                <p className="font-bold text-red-500">
                  ${notif.monto.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
