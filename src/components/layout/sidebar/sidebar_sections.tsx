import { Link } from 'react-router';
import type { SidebarSectionsProps } from '@/config/sidebar.config';
import { cn } from '@/lib/utils';
import { SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';

export const SidebarSections = ({
  page,
  pathname,
}: {
  page: SidebarSectionsProps;
  pathname: string;
}) => {
  return (
    <SidebarMenuItem key={page.name}>
      <SidebarMenuButton asChild>
        <Link
          aria-disabled={page.name === 'Lista de compras'}
          to={page.href}
          className={cn(
            pathname === page.href
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
          )}
        >
          <page.icon />
          <span className="text-md font-medium">
            {page.name === 'Lista de compras'
              ? 'Lista de compras (Working)'
              : page.name}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
