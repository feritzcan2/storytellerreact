import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';
import MainContainer from 'src/pages/mainContainer';
import CustomerEditForm from './components/CustomerEditForm';

// ----------------------------------------------------------------------

export default function CreateCustomerPage() {
  const { configs } = useContext(GlobalContext);
  return (
    <>
      <Helmet>
        <title> Müşteri Ekle</title>
      </Helmet>
      <Typography variant="h4">Yeni müşteri ekle</Typography>
      <MainContainer>
        <CustomerEditForm configs={configs} />
      </MainContainer>
    </>
  );
}
