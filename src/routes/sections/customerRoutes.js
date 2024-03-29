import { lazy, Suspense } from 'react';

import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import DashboardLayout from 'src/layouts/dashboard';
import CustomerChatPage from 'src/pages/customer/chat/CustomerChatPage';
import CreateCustomerPage from 'src/pages/customer/create/CreateCustomerPage';
import CustomerListPage from 'src/pages/customer/list/CustomerListPage';
import CustomerDetailsPage from 'src/pages/customer/viewCustomer/CustomerDetailsPage';
import CustomerSearchPage from 'src/pages/customer/viewCustomer/CustomerSearchPage';

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
      { path: 'mesajlar', element: <CustomerChatPage /> },
      { path: 'liste', element: <CustomerListPage /> },
      { path: ':id', element: <CustomerDetailsPage /> },
      { path: 'detay', element: <CustomerSearchPage /> },
    ],
  },
];
