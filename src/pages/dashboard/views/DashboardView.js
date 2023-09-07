// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets

import InvoiceAnalytic from './invoice-analytic';
import { Card, Divider, Typography, alpha } from '@mui/material';
import CountryDatesWidget from './CountryDatesWidget';
import { GlobalContext } from 'src/context/GlobalProvider';
import { useContext } from 'react';
import ClosestAppointmentComponent from './ClosestAppointmentComponent';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const { user } = useMockedUser();
  const { countryAppointmentData } = useContext(GlobalContext);

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={5}>
        <Grid spacing={5} xs={12} md={12} lg={12}>
          <Grid xs={6} md={6} lg={6}>
            <CountryDatesWidget
              countryAppointmentData={countryAppointmentData}
              list={_appInstalled}
            />
          </Grid>
          <Divider sx={{ mt: 3, mb: 3 }}></Divider>
          <Grid xs={6} md={6} lg={6}>
            <ClosestAppointmentComponent title="Bugünkü Randevular" list={_appInstalled} />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, mb: 55 }}></Divider>

        <Grid xs={12} md={12}>
          <Card>
            <Typography sx={{ mt: 2, ml: 4 }} variant="subtitle2">
              Müşteri Analizi
            </Typography>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Günlük"
                total={5}
                percent={100}
                price={222}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Haftalık"
                total={5}
                percent={100}
                price={222}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Aylık"
                total={5}
                percent={100}
                price={222}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Yıllık"
                total={5}
                percent={100}
                price={222}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={4}></Grid>
      </Grid>
    </Container>
  );
}
