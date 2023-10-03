import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import CustomerService from 'src/api/CustomerService';
import { LoadingScreen } from 'src/components/loading-screen';
import { useParams } from 'src/routes/hooks';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { UserProfileView } from './user/view';

// ----------------------------------------------------------------------
const getUrl = 'https://api.vizedefteri.com/Customer/sessionByCustomer?id=';

export default function ViewCustomer() {
  const params = useParams();
  const { id } = params;

  const { getCustomer } = CustomerService();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    setIsLoading(true);
    setUserData(await getCustomer(id));
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, [shouldRefetch]);

  console.log('userData', userData);
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <LoadingScreen sx={{ flexGrow: 0, minHeight: 0 }} />
        <div>Loading</div>
      </div>
    );
  }

  if (!userData || error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Typography variant="h2" sx={{ margin: 1, color: 'text.primary' }}>
          No Data try again Later
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title> ViewCustomer: ss</title>
      </Helmet>
      <Grid
        flexDirection={'column'}
        display={'flex'}
        height={'100%'}
        justifyContent={'space-between'}
      >
        <UserProfileView userData={userData} />
      </Grid>
    </>
  );
}
