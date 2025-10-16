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
        <a
          href={page.href}
          className={cn(
            pathname === page.href
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
          )}
        >
          <page.icon />
          <span className="text-md font-medium">{page.name}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
