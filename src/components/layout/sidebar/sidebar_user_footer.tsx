import { ChevronUp, User2 } from 'lucide-react';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { mockUsers } from '@/mocks/user.mock';

export const SidebarUserFooter = () => {
  const mockUserId = mockUsers[0].id_usuario;
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <SidebarMenuButton>
                <User2 /> Juan
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-ancho-width]"
            >
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link to={`/account/${mockUserId}`}>Cuenta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
