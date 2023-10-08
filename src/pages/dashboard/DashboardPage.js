import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import DashboardView from './views/DashboardView';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Anasayfa</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Anasayfa
      </Typography>
      <DashboardView />
    </>
  );
}
