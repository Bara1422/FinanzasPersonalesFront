import type { Category } from '@/mocks/category.mock';
import type { Notification } from '@/mocks/notification.mock';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Props {
  filteredNotifications: Notification[];
  categories: Category[];
}

export const PaidNotificationsCard = ({
  filteredNotifications,
  categories,
}: Props) => {
  const filteredPaid = filteredNotifications.filter(
    (notification) => notification.pagado,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Historial de Pagos
        </CardTitle>
        <CardDescription>Gastos que ya han sido pagados</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {filteredPaid.map((notification) => (
            <div
              key={notification.id_notificacion}
              className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground">
                    {notification.mensaje}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {
                        categories.find(
                          (cat) =>
                            cat.id_categoria === notification.id_categoria,
                        )?.nombre
                      }
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Vencía:{' '}
                      {new Date(
                        notification.fecha_vencimiento,
                      ).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-muted-foreground">
                  ${notification.monto.toLocaleString()}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs border-chart-2 text-chart-2"
                >
                  Pagado
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
