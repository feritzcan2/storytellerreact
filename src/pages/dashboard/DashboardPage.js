import { Helmet } from 'react-helmet-async';
// sections
import FiveView from 'src/sections/five/view';
import { OverviewAppView } from './app/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>

      <OverviewAppView />
    </>
  );
}
