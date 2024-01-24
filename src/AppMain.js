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
import ConfigService from './api/ConfigService';
import { GlobalContext } from './context/GlobalProvider';
import { LoadingScreen } from './components/loading-screen';

// ----------------------------------------------------------------------

export default function AppMain() {
  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██
AppMain
  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');
  const {getConfigs} = ConfigService()
  const { configs } = useContext(GlobalContext);
  useEffect(()=>{
getConfigs()
  },[])
  useScrollToTop();

  if(configs ===null) return <LoadingScreen/>
  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}
