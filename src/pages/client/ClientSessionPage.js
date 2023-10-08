import { useContext, useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { LoadingScreen } from 'src/components/loading-screen';
import { useParams } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
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

import ConfigService from 'src/api/ConfigService';
import CustomerService from 'src/api/CustomerService';
import Iconify from 'src/components/iconify';
import { GlobalContext } from 'src/context/GlobalProvider';
import { useConfigs } from 'src/hooks/use-configs';
import AdminMessage from './adminMessage';
import ContactHero from './contact/contact-hero';
import CustomerCard from './customerCard/CustomerCard';
import HandDeliverFilesDialog from './customerCard/HandDeliverFilesDialog';
import FormDialog from './form-dialog';

// ----------------------------------------------------------------------

const sectionContact = {
  contact: '123123123',
  email: '123@gmail.com',
  name: 'Super Company Name',
};

export default function ContactView() {
  const theme = useTheme();
  const params = useParams();
  const { configs } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(configs === null);

  const { id } = params;
  const { getCustomer } = CustomerService();
  const { getConfigs } = ConfigService();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState();
  const { userData } = useContext(GlobalContext);

  const newCustomerBase = {
    name: '',
    email: '',
    surname: '',
    phone: '',
    surname: '',
    taxType: configs?.taxTypes[0]?.id || 1,
    files: [],
  };

  const getUserData = async () => {
    setIsLoading(true);
    setCustomerData(await getCustomer(id));
    if (configs !== null) setIsLoading(false);
  };
  const fetchConfigs = async () => {
    setIsLoading(true);
    await getConfigs();
    if (customerData !== null) setIsLoading(false);
  };

  useEffect(() => {
    if (configs === null) {
      fetchConfigs();
    }
    getUserData();
    setShouldRefetch(false);
  }, [shouldRefetch]);

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
  if (!customerData) {
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
  var configData = useConfigs(customerData);
  // if (configs === null) return <LoadingScreen />;
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
                  Kolay
                </Typography>
                <Typography variant="h2" sx={{ margin: 1, color: 'common.white' }}>
                  Başvuru
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ color: 'text.primary', mb: 5 }}>
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  Ülke:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {configData.country.name || 'No Country'}
                </Typography>
                <Iconify
                  icon={'flagpack:' + configData.country.code.toLowerCase()}
                  sx={{ borderRadius: 0.65, width: 40, height: 40, mr: 1 }}
                />
              </Stack>
              <Stack direction="row" alignItems="center" sx={{ color: 'text.primary', mb: 5 }}>
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  Vize türü:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {configData.visaType.name}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                marginBottom={{ xs: 5, md: 20 }}
                sx={{ color: 'text.primary' }}
              >
                <Typography variant="h4" sx={{ color: 'text.disabled', margin: 1 }}>
                  Planlanan seyehat tarihi:
                </Typography>
                <Typography variant="h5" sx={{ color: 'common.white', margin: 1 }}>
                  {fDate(customerData.plannedTravelDate)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="start" sx={{ color: 'text.primary', mb: 2 }}>
                <AdminMessage
                  name={customerData.adminName}
                  description={customerData.adminMessage}
                  postedAt={customerData.adminMessageTime}
                />
              </Stack>
            </Grid>

            <Grid xs={12} md={7} lg={7} marginTop={{ xs: 5, md: 10 }} alignItems="center">
              {/* <Scrollbar sx={{ height: '90vh' }}> */}
              <UsersCard
                customerData={customerData}
                setCustomerData={setCustomerData}
                newCustomerBase={newCustomerBase}
                setShouldRefetch={setShouldRefetch}
              />
              {/* </Scrollbar> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

function UsersCard({ customerData, setCustomerData, newCustomerBase, setShouldRefetch }) {
  const [filesModalOpen, setFilesModalOpen] = useState(false);
  return (
    <Box
      sx={{
        py: { md: 10 },
        height: { md: 1 },
        hideScroll: true,
      }}
    >
      <Masonry spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, lg: 2, md: 1 }}>
        <FormDialog
          SelectedCustomerData={newCustomerBase}
          customerData={customerData}
          setUserData={setCustomerData}
          customerIndex={customerData?.customers?.length || 0}
          setShouldRefetch={setShouldRefetch}
        />

        {customerData?.customers &&
          customerData?.customers?.map((customer, index) => (
            <>
              <CustomerCard
                onViewFiles={() => {
                  setFilesModalOpen(true);
                }}
                key={`${index}_${customer}`}
                customer={customer}
                customerData={customerData}
                setUserData={setCustomerData}
                customerIndex={index}
                setShouldRefetch={setShouldRefetch}
              />
              <HandDeliverFilesDialog
                customer={customer}
                open={filesModalOpen}
                onClose={() => {
                  setFilesModalOpen(false);
                }}
              ></HandDeliverFilesDialog>
            </>
          ))}
      </Masonry>
    </Box>
  );
}
