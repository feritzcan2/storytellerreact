import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import ViewCustomer from './viewCustomer';
// @mui
// routes
// _mock
// hooks
// components
//

// -------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CustomerDetailsPage(page) {
  const params = useParams();
  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Müşteri Listesi</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Müşteri Detayı
      </Typography>
      {<ViewCustomer id={parseInt(id)} />}
    </>
  );
}
