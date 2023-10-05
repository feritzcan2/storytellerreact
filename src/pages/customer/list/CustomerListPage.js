import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import CustomerService from 'src/api/CustomerService';
import { GlobalContext } from 'src/context/GlobalProvider';
import UserListView from './UserListView';
// @mui
// routes
// _mock
// hooks
// components
//

// -------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CustomerListPage(page) {
  const { customerList } = useContext(GlobalContext);
  const { getCustomers } = CustomerService();

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Helmet>
        <title> Müşteri Listesi</title>
      </Helmet>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Müşteri Listesi
      </Typography>
      <UserListView tableData={customerList} />
    </>
  );
}
