import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Home,
  Settings,
  HelpCircle,
  Globe,
  Moon,
  Sun,
  LogOut,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function AppSidebar() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();

  const currentPath = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
    toast.success('Logged out successfully');
  };

  const handleLanguageChange = (lang: string) => {
    toast.success(`Language changed to ${lang}`);
  };

  return (
    <Sidebar className="w-80 overflow-x-hidden">
      <SidebarHeader className="border-b border-border p-6 overflow-x-hidden">
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-3 transition-opacity hover:opacity-80 min-w-0"
        >
          <img src="/assets/generated/logo-transparent.dim_200x200.png" alt="Email365 Logo" className="h-10 w-10 flex-shrink-0" />
          <span className="text-xl font-semibold truncate">Email365</span>
        </button>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        {/* Utilities section - directly under header */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-base">Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate({ to: '/' })}
                  isActive={currentPath === '/'}
                  tooltip="Homepage"
                  className="mx-4 px-4 py-3"
                >
                  <Home className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base truncate">Homepage</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate({ to: '/settings' })}
                  isActive={currentPath === '/settings'}
                  tooltip="Settings"
                  className="mx-4 px-4 py-3"
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base truncate">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate({ to: '/help' })}
                  isActive={currentPath === '/help'}
                  tooltip="Help"
                  className="mx-4 px-4 py-3"
                >
                  <HelpCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base truncate">Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Language" className="mx-4 px-4 py-3">
                      <Globe className="h-5 w-5 flex-shrink-0" />
                      <span className="text-base truncate">Language</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right">
                    <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange('Spanish')}>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange('French')}>
                      Français
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange('German')}>
                      Deutsch
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Clean placeholder for email categories */}
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center overflow-x-hidden">
          <div className="mb-4 rounded-full bg-muted p-6">
            <Mail className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-foreground">Email Management</h3>
          <p className="text-sm text-muted-foreground">
            Your email categories and navigation will appear here once configured.
          </p>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-6 overflow-x-hidden">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="default"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full justify-start px-4 py-3 text-base"
          >
            {theme === 'dark' ? <Sun className="mr-3 h-5 w-5 flex-shrink-0" /> : <Moon className="mr-3 h-5 w-5 flex-shrink-0" />}
            <span className="truncate">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
          <Button
            variant="ghost"
            size="default"
            onClick={handleLogout}
            className="w-full justify-start px-4 py-3 text-base text-destructive hover:text-destructive"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="truncate">Log Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
