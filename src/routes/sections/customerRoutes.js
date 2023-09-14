import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import UserListView from 'src/pages/customer/userList/user-list-view';
import CustomerPage from 'src/pages/customer/CustomerPage';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/DashboardPage'));

// ----------------------------------------------------------------------

export const customerRoutes = [
  {
    path: 'musteri',
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
      { element: <IndexPage />, index: true },
      { path: 'yeni', element: <CustomerPage /> },
      { path: 'liste', element: <IndexPage /> },
    ],
  },
];
