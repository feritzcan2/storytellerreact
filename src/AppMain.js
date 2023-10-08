// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Fragment } from 'react';

// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// ----------------------------------------------------------------------
// routes
import Router from 'src/routes/sections';

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

  useScrollToTop();

  return (
    <Fragment>
      <Router />
    </Fragment>
  );
}
