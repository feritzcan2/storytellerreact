import { Helmet } from 'react-helmet-async';
// sections
import { GlobalContext } from 'src/context/GlobalProvider';
import { useContext, useEffect, useState } from 'react';
import CustomerService from 'src/api/CustomerService';
import CreateCustomerView from './CreateCustomerView';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CreateCustomerPage() {
  return (
    <>
      <Helmet>
        <title> Müşteri Ekle</title>
      </Helmet>
      <Typography variant="h4">Yeni müşteri ekle</Typography>
      <CreateCustomerView />
    </>
  );
}
