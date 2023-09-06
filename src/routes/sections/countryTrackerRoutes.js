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
  import('src/pages/countryTracker/NotificationSettingsPage')
);

// ----------------------------------------------------------------------

export const countryTrackerRoutes = [
  {
    path: 'randevuTakip',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <CountryTrackerPage />, index: true },
      { path: 'ispanya', element: <CountryTrackerPage country="ispanya" /> },
      { path: 'almanya', element: <CountryTrackerPage country="almanya" /> },
      { path: 'yunanistan', element: <CountryTrackerPage country="yunanistan" /> },
      { path: 'italya', element: <CountryTrackerPage country="italya" /> },
      { path: 'hollanda', element: <CountryTrackerPage country="hollanda" /> },
      { path: 'bildirimAyarlari', element: <NotificationSettingsPage /> },
    ],
  },
];
