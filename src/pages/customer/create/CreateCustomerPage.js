import { Helmet } from 'react-helmet-async';
// sections
import { GlobalContext } from 'src/context/GlobalProvider';
import { useContext, useEffect, useState } from 'react';
import CustomerService from 'src/api/CustomerService';
import { Container, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import CustomerEditForm from './components/CustomerEditForm';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function CreateCustomerPage() {
  const { configs } = useContext(GlobalContext);
  console.log(configs);
  const settings = useSettingsContext();
  if (configs === null) return <LoadingScreen />;
  return (
    <>
      <Helmet>
        <title> Müşteri Ekle</title>
      </Helmet>
      <Typography variant="h4">Yeni müşteri ekle</Typography>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomerEditForm configs={configs} />
      </Container>
    </>
  );
}
