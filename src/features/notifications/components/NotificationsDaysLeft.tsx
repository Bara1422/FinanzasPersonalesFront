import { Calendar } from 'lucide-react';

interface Props {
  notification: {
    fecha_vencimiento: string;
  };
  isUrgent: boolean;
  isOver: boolean;
  daysLeft: number;
}

export const NotificationsDaysLeft = ({
  notification,
  isUrgent,
  isOver,
  daysLeft,
}: Props) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>
          Vence:{' '}
          {new Date(notification.fecha_vencimiento).toLocaleDateString('es-ES')}
        </span>
      </div>
      <span
        className={`font-medium ${isOver || isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}
      >
        {isOver
          ? `Vencido hace ${Math.abs(daysLeft)} días`
          : daysLeft === 0
            ? 'Vence hoy'
            : daysLeft === 1
              ? 'Vence mañana'
              : `Faltan ${daysLeft} días`}
      </span>
    </div>
  );
};
