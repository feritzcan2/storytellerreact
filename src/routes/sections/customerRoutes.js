import { lazy, Suspense } from 'react';

import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from 'src/layouts/dashboard';
import CreateCustomerPage from 'src/pages/customer/create/CreateCustomerPage';
import CustomerListPage from 'src/pages/customer/list/CustomerListPage';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/DashboardPage'));
const ViewCustomer = lazy(() => import('src/pages/customer/viewCustomer/viewCustomer'));

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
      { path: ':id', element: <ViewCustomer /> },
    ],
  },
];
