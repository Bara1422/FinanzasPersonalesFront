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
import { useAuthStore } from '@/store/authStore';

export const SidebarUserFooter = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <SidebarMenuButton>
                <User2 /> {usuario?.nombre}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-ancho-width]"
            >
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link to={`/account/${usuario?.id_usuario}`}>Cuenta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={handleLogout}
              >
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
