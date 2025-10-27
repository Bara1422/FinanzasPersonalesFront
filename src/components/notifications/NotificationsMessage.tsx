import { Badge } from '../ui/badge';

type NotificationPriority = 'ALTA' | 'MEDIA' | 'BAJA';

interface Props {
  notification: {
    mensaje: string;
    id_categoria: number;
    prioridad: NotificationPriority;
  };
  categories: {
    id_categoria: number;
    nombre: string;
  }[];
}

export const NotificationsMessage = ({ notification, categories }: Props) => {
  const getPriorityTextColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'ALTA':
        return 'border-destructive text-destructive';
      case 'MEDIA':
        return 'border-yellow-500 text-yellow-600';
      case 'BAJA':
        return 'border-chart-2 text-chart-2';
      default:
        return 'border-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-start justify-between ">
      <div>
        <h4 className="font-medium">{notification.mensaje}</h4>
        <div className="flex item-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs">
            {notification.id_categoria
              ? categories.find(
                  (categ) => categ.id_categoria === notification.id_categoria,
                )?.nombre
              : 'Sin categoría'}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${getPriorityTextColor(notification.prioridad)}`}
          >
            {notification.prioridad.slice(0, 1).toUpperCase() +
              notification.prioridad.slice(1).toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
};
