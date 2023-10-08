import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const CountryTrackerPage = lazy(() => import('src/pages/countryTracker/CountryTrackerPage'));
const NotificationSettingsPage = lazy(() =>
  import('src/pages/countryTracker/notificationSettings/NotificationSettingsPage')
);

// ----------------------------------------------------------------------

export const settingsRoutes = [
  {
    path: 'ayarlar',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [{ path: 'bildirim', element: <NotificationSettingsPage /> }],
  },
];
