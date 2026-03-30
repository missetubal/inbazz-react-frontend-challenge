import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { LoginPage, LandingPage, RegisterPage, DiscoverPage } from '@/pages';
import { AppLayout } from '@/components/custom';

function RootLayout() {
  return <AppLayout />;
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: '/shelf' });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Outlet,
});

const shelfRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/shelf',
  // component: ShelfPage,
});

const bookDetailRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/book/$bookId',
  // component: BookDetailPage,
});

const discoverRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/discover',
  component: DiscoverPage,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  registerRoute,
  authenticatedRoute.addChildren([shelfRoute, discoverRoute, bookDetailRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});
