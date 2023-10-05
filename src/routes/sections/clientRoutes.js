import { lazy, Suspense } from 'react';

import { Outlet } from 'react-router-dom';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/client/ClientSessionPage'));

const pageStyle = {
  padding: '20px',
  margin: '10ppx',
};
// ----------------------------------------------------------------------

export const clientRoutes = [
  {
    path: 'client/:id',
    element: (
      <div>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </div>
    ),
    children: [{ element: <IndexPage />, index: true }],
  },
];
