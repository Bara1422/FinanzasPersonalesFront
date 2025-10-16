import { useLocation } from 'react-router';
import { pages } from '@/config/sidebar.config';
import { Separator } from '../../ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '../../ui/sidebar';
import { SidebarSections } from './sidebar_sections';
import { SidebarUserFooter } from './sidebar_user_footer';

export function AppSidebar() {
  const pathname = useLocation().pathname;
  console.log(pathname);

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader />

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-xl">
            Finanzas Personales
          </SidebarGroupLabel>

          <Separator className="my-2" />

          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {/* Sidebar sections */}
              {pages.map((page) => (
                <SidebarSections
                  key={page.name}
                  page={page}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      {/* Footer */}
      <SidebarUserFooter />
    </Sidebar>
  );
}
