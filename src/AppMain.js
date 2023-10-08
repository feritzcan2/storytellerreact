// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Fragment, useContext, useEffect } from 'react';

// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// ----------------------------------------------------------------------
// routes
import Router from 'src/routes/sections';

import AuthService from './api/AuthService';
import ConfigService from './api/ConfigService';
import CountryService from './api/CountryService';
import CustomerService from './api/CustomerService';
import DashboardService from './api/DashboardService';
import { LoadingScreen } from './components/loading-screen';
import { isAuthenticated } from './context/AuthContext';
import { GlobalContext } from './context/GlobalProvider';

// ----------------------------------------------------------------------

export default function AppMain() {
  const { getCountryData } = CountryService();
  const { getUserData } = AuthService();
  const { getConfigs } = ConfigService();
  const { getCustomers } = CustomerService();
  const { getNotifications } = DashboardService();

  const { configs } = useContext(GlobalContext);

  useEffect(() => {
    if (isAuthenticated()) {
      getUserData();
      getConfigs();
      getCountryData();
      getNotifications();
      getCustomers();
    }
    setInterval(() => {
      if (isAuthenticated()) {
        getCountryData();
      }
    }, 555000);
    clearInterval();
  }, []);

  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██
AppMain
  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  if (configs === null) return <LoadingScreen />;
  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}
