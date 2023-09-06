// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import CombinedContextProviders from './context/CombinedContextProviders';
import { Fragment, useEffect } from 'react';
import CountryService from './api/CountryService';
import AuthService from './api/AuthService';
import { isAuthenticated } from './context/AuthContext';

// ----------------------------------------------------------------------

export default function AppMain() {
  const { getCountryData } = CountryService();
  const { getUserData } = AuthService();

  useEffect(() => {
    if (isAuthenticated()) {
      getUserData();
      getCountryData();
    }
    setInterval(() => {
      if (isAuthenticated()) {
        getCountryData();
      }
    }, 5000);
  }, []);

  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}
