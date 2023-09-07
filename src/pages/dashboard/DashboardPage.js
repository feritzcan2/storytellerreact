import { Helmet } from 'react-helmet-async';
// sections
import FiveView from 'src/sections/five/view';
import DashboardView from './views/DashboardView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
