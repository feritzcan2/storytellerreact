import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import UserListView from 'src/pages/customer/userList/user-list-view';
import CustomerListPage from 'src/pages/customer/CustomerListPage';
import CreateCustomerPage from 'src/pages/customer/create/CreateCustomerPage';

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
      { path: 'yeni', element: <CreateCustomerPage /> },
      { path: 'liste', element: <CustomerListPage /> },
    ],
  },
];
