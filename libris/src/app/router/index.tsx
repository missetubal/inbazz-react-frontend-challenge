import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router';
import {
  LoginPage,
  LandingPage,
  RegisterPage,
  DiscoverPage,
  ShelfPage,
  BookDetailsPage,
} from '@/pages';
import { AppLayout } from '@/components/custom';

import { useAuthStore } from '@/features/auth/model/auth-store';
function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Outlet />;
  }
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
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/shelf' });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/shelf' });
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
    if (!useAuthStore.getState().isAuthenticated) {
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
  component: ShelfPage,
});

export const bookDetailRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/book/$bookId',
  component: BookDetailsPage,
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
