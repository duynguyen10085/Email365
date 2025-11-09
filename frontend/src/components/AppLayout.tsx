import { Outlet } from '@tanstack/react-router';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
