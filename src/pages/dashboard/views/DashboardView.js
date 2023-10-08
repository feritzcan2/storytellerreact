// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appInstalled } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets

import { Card, Divider, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import DashboardService from 'src/api/DashboardService';
import { GlobalContext } from 'src/context/GlobalProvider';
import MainContainer from 'src/pages/mainContainer';
import ClosestAppointmentComponent from './ClosestAppointmentComponent';
import CountryDatesWidget from './CountryDatesWidget';
import InvoiceAnalytic from './invoice-analytic';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const { user } = useMockedUser();
  const { countryAppointmentData, dashboardData, configs } = useContext(GlobalContext);
  console.log(dashboardData);
  console.log(configs);
  var { getDashboardData } = DashboardService();

  useEffect(() => {
    getDashboardData();
  }, []);
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <MainContainer>
      <Grid container spacing={5}>
        <Grid spacing={5} xs={12} md={12} lg={12}>
          <Grid xs={6} md={6} lg={6}>
            <CountryDatesWidget
              configs={configs}
              countryAppointmentData={countryAppointmentData}
              list={_appInstalled}
            />
          </Grid>
          <Divider sx={{ mt: 3, mb: 3 }}></Divider>
          <Grid xs={6} md={6} lg={6}>
            <ClosestAppointmentComponent
              configs={configs}
              title="Yaklaşan Randevular"
              data={dashboardData}
              list={_appInstalled}
            />
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
    </MainContainer>
  );
}
