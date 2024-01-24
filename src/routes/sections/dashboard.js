import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import CalendarPage from 'src/pages/dashboard/calendar/CalendarPage';
import ServiceHealthPage from 'src/pages/ServiceHealth/ServiceHealthPage';

// ----------------------------------------------------------------------

const Dashboard = lazy(() => import('src/pages/dashboard/DashboardPage'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'anasayfa',
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
      { element: <Dashboard />, index: true },
      { path: 'takvim', element: <CalendarPage /> },
      { path: 'serviceHealth', element: <ServiceHealthPage /> },
    ],
  },
];
