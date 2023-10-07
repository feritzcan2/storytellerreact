// sections
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import CustomerService from 'src/api/CustomerService';
import { LoadingScreen } from 'src/components/loading-screen';
// @mui
// routes
// _mock
// hooks
// components
//

// -------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CustomerSearchPage(page) {
  const { getCustomerNames } = CustomerService();
  const [customerNames, setCustomerNames] = useState(null);
  const nav = useNavigate();

  const goToCustomer = (id) => {
    let customerId = parseInt(id);
    if (isNaN(customerId) === false) {
      nav('/musteri/' + customerId);
    }
  };
  useEffect(() => {
    getCustomerNames().then((x) => {
      setCustomerNames(x);
    });
  }, []);

  if (customerNames === null) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title> Müşteri Listesi</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Müşteri Listesi
      </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={customerNames}
        sx={{ width: '100%', minHeight: 303, marginTop: 20 }}
        onChange={(data, d) => {
          goToCustomer(d.id);
        }}
        text={{ color: 'red' }}
        color="red"
        getOptionLabel={(data) => data.name}
        renderInput={(params) => (
          <TextField sx={{ minHeight: 501 }} variant="filled" {...params} label="MÜŞTERİ SEÇ..." />
        )}
      />
    </>
  );
}
