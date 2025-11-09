import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import AppLayout from './components/AppLayout';
import InboxPage from './pages/InboxPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import AuthenticatedHomePage from './pages/AuthenticatedHomePage';
import ProfileSetupModal from './components/ProfileSetupModal';

const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isAuthenticated) {
    return (
      <>
        <AppLayout />
        {showProfileSetup && <ProfileSetupModal />}
      </>
    );
  }

  return <HomePage />;
}

function HomeRouteComponent() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (isAuthenticated) {
    return <AuthenticatedHomePage />;
  }

  return <HomePage />;
}

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRouteComponent,
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/demo',
  component: DemoPage,
});

const inboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inbox',
  component: InboxPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categoryId',
  component: InboxPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/help',
  component: HelpPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  demoRoute,
  inboxRoute,
  categoryRoute,
  settingsRoute,
  helpRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
