import { Badge } from '../../../components/ui/badge';

type NotificationPriority = 'ALTA' | 'MEDIA' | 'BAJA';

interface Props {
  notification: {
    descripcion: string;
    id_categoria: number;
    prioridad: NotificationPriority;
  };
  categories: {
    id_categoria: number;
    nombre: string;
  }[];
  getPriorityColor: (priority: string) => string;
}

export const NotificationsMessage = ({
  notification,
  categories,
  getPriorityColor,
}: Props) => {
  return (
    <div className="flex items-start justify-between ">
      <div>
        <h4 className="font-medium">{notification.descripcion}</h4>
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
            className={`text-xs ${getPriorityColor(notification.prioridad)}`}
          >
            {notification.prioridad.slice(0, 1).toUpperCase() +
              notification.prioridad.slice(1).toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
};
