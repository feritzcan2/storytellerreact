import { Navigate, useRoutes } from 'react-router-dom';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { customerRoutes } from './customerRoutes';
import { countryTrackerRoutes } from './countryTrackerRoutes';
import { clientRoutes } from './clientRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    },

    // Auth routes
    ...authRoutes,
    ...customerRoutes,
    ...countryTrackerRoutes,
    // Dashboard routes
    ...dashboardRoutes,
    ...clientRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
