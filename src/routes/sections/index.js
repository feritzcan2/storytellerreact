import { Navigate, useRoutes } from 'react-router-dom';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes } from './main';

import { authRoutes } from './auth';
import { clientRoutes } from './clientRoutes';
import { countryTrackerRoutes } from './countryTrackerRoutes';
import { customerRoutes } from './customerRoutes';
import { dashboardRoutes } from './dashboard';
import { settingsRoutes } from './settingsRoutes';

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
    ...settingsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
