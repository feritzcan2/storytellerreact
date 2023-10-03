import { useEffect, useState } from 'react';

import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { LoadingScreen } from 'src/components/loading-screen';
import { useParams } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
// import axios from 'src/utils/axios';
import { fDate } from 'src/utils/format-time';

import Masonry from '@mui/lab/Masonry';
import { Stack } from '@mui/material';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// sections
import Grid from '@mui/material/Unstable_Grid2';

import AdminMessage from './adminMessage';
import ContactHero from './contact/contact-hero';
import dumyData from './DATA';
import FormDialog from './form-dialog';
import SideCard from './SideCard';

// ----------------------------------------------------------------------

const sectionContact = {
  contact: '123123123',
  email: '123@gmail.com',
  name: 'Super Company Name',
};

const getUrl = 'https://api.vizedefteri.com/Customer/session?id=';
// const postUrl = 'https://api.vizedefteri.com/Customer/updateCustomerSession?id=3';
// const urlTest = 'https://jsonplaceholder.typicode.com/posts';

export default function ContactView() {
  const theme = useTheme();
  const params = useParams();

  const { id } = params;
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();
  const newCustomerBase = {
    name: '',
    email: '',
    surname: '',
    phone: '',
    surname: '',
    files: [],
    // userData?.customers[0]?.files.map((file) => file),
  };

  const getUserData = () => {
    setIsLoading(true);
    axios
      .get(getUrl + id)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, [shouldRefetch]);

  console.log('dumyData', dumyData);
  // console.log('newCustomerBase', newCustomerBase);
  // console.log('userData', userData);
  // console.log('userData2 =>>>> ', data2);
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
    <div>
      <Helmet>
        <title> Client Page</title>
      </Helmet>
      <ContactHero sectionText={sectionContact} />

      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.grey[900], 0.9),
            imgUrl: '/assets/images/about/testimonials.jpg',
          }),
          overflow: 'hidden',
          height: { md: '100%' },
          minHeight: { md: '100vh' },
          py: { xs: 10, md: 0 },
          padding: 0,
          margin: 0,
        }}
      >
        <Container
          // component={MotionViewport}
          sx={{ position: 'relative', height: 1, maxWidth: '99% !important' }}
        >
          import {useParams} from '../../routes/hooks/use-params';
          <Grid
            container
            spacing={3}
            alignItems="start"
            justifyContent={{ xs: 'center', md: 'space-between' }}
            sx={{ height: 1 }}
          >
            <Grid xs={10} md={5} marginTop={{ xs: 10, md: 15 }}>
              <Stack direction="row" alignItems="center" marginBottom={{ xs: 5, md: 15 }}>
                <Typography variant="h2" sx={{ margin: 1, color: 'common.white' }}>
                  Easy
                </Typography>
                <Typography variant="h2" sx={{ margin: 1, color: 'common.white' }}>
                  Application
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ color: 'text.primary', mb: 5 }}>
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  Country:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {userData.country}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ color: 'text.primary', mb: 5 }}>
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  VISA:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {userData.visaType}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                marginBottom={{ xs: 5, md: 20 }}
                sx={{ color: 'text.primary' }}
              >
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  Planned Travel Date:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {fDate(userData.plannedTravelDate)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="start" sx={{ color: 'text.primary', mb: 2 }}>
                <AdminMessage
                  name={userData.adminName}
                  description={userData.adminMessage}
                  postedAt={userData.adminMessageTime}
                />
                {/* <Typography variant="h4" sx={{ color: theme.palette.primary.light, margin: 1 }}>
                  Message:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {userData.message}
                </Typography> */}
              </Stack>
            </Grid>

            <Grid xs={12} md={7} lg={7} marginTop={{ xs: 5, md: 10 }} alignItems="center">
              {/* <Scrollbar sx={{ height: '90vh' }}> */}
              <UsersCard
                userData={userData}
                setUserData={setUserData}
                newCustomerBase={newCustomerBase}
              />
              {/* </Scrollbar> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

function UsersCard({ userData, setUserData, newCustomerBase }) {
  return (
    <Box
      sx={{
        py: { md: 10 },
        height: { md: 1 },
        overflow: 'hidden',
        hideScroll: true,
        overflowX: 'hidden',
      }}
    >
      <Masonry spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, md: 2 }}>
        <FormDialog
          SelectedCustomerData={newCustomerBase}
          userData={userData}
          setUserData={setUserData}
          customerIndex={userData?.customers?.length || 0}
        />

        {userData?.customers &&
          userData?.customers?.map((customer, index) => (
            <SideCard
              key={`${index}_${customer}`}
              customer={customer}
              userData={userData}
              setUserData={setUserData}
              customerIndex={index}
            />
          ))}
      </Masonry>
    </Box>
  );
}
