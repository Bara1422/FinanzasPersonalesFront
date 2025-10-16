import {
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  type LucideProps,
  PieChart,
  ShoppingCart,
} from 'lucide-react';

export interface SidebarSectionsProps {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export const pages: SidebarSectionsProps[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transacciones', href: '/transactions', icon: CreditCard },
  { name: 'Categorias', href: '/categories', icon: PieChart },
  { name: 'Lista de compras', href: '/shopping-list', icon: ShoppingCart },
  { name: 'Reportes', href: '/reports', icon: FileText },
  { name: 'Notificaciones', href: '/notifications', icon: Bell },
];
