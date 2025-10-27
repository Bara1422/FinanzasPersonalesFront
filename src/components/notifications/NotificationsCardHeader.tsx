import { Clock } from 'lucide-react';
import type { Notification } from '@/mocks/notification.mock';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Props {
  filteredNotifications: Notification[];
}

export const NotificationsCardHeader = ({ filteredNotifications }: Props) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Gastos Pendientes
      </CardTitle>
      <CardDescription>
        Gastos programados que aun no fueron pagados{' '}
        {filteredNotifications.length}
      </CardDescription>
    </CardHeader>
  );
};
