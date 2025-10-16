import type React from 'react';
import { Outlet } from 'react-router';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './sidebar/sidebar';

export function Layout(): React.JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
