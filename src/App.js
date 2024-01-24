// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// auth
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';
import { MotionLazy } from 'src/components/animate/motion-lazy';
// components
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// theme
import ThemeProvider from 'src/theme';

import AppMain from './AppMain';
import CombinedContextProviders from './context/CombinedContextProviders';
import ConfigService from './api/ConfigService';

// ----------------------------------------------------------------------

export default function App() {

  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██
App
  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  return (
    <CombinedContextProviders>
      <AuthProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SettingsDrawer />
              <ProgressBar />
              <AuthConsumer>
                <AppMain />
              </AuthConsumer>
            </MotionLazy>
          </ThemeProvider>{' '}
        </SettingsProvider>
      </AuthProvider>
    </CombinedContextProviders>
  );
}
