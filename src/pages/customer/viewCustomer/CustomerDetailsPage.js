import { Helmet } from 'react-helmet-async';
// sections
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CustomerService from 'src/api/CustomerService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
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
  const { customerList } = useContext(GlobalContext);
  const { getCustomerNames } = CustomerService();
  const [customerNames, setCustomerNames] = useState(null);
  const [customerId, setCustomerId] = useState(NaN);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setCustomerId(parseInt(id));
    getCustomerNames().then((x) => {
      setCustomerNames(x);
    });
  }, []);

  const customerSelectionView = (customerNames) => {
    if (customerNames === null) return <LoadingScreen />;
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={customerNames}
        sx={{ width: '100%', minHeight: 303, marginTop: 20 }}
        onChange={(data, d) => {
          setCustomerId(d.id);
        }}
        text={{ color: 'red' }}
        color="red"
        getOptionLabel={(data) => data.name}
        renderInput={(params) => (
          <TextField sx={{ minHeight: 501 }} variant="filled" {...params} label="MÜŞTERİ SEÇ..." />
        )}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title> Müşteri Listesi</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Müşteri Listesi
      </Typography>
      {isNaN(customerId) && customerSelectionView(customerNames)}
      {isNaN(customerId) === false && <ViewCustomer id={customerId} />}
    </>
  );
}
