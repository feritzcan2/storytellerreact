// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Fragment, useEffect } from 'react';

// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// ----------------------------------------------------------------------
// routes
import Router from 'src/routes/sections';

import AuthService from './api/AuthService';
import CountryService from './api/CountryService';
import { isAuthenticated } from './context/AuthContext';
import ConfigService from './api/ConfigService';

// ----------------------------------------------------------------------

export default function AppMain() {
  const { getCountryData } = CountryService();
  const { getUserData } = AuthService();
  const { getConfigs } = ConfigService();

  useEffect(() => {
    if (isAuthenticated()) {
      getUserData();
      getConfigs();
      getCountryData();
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

  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}
