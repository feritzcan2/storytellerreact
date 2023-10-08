// sections

import { Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AuthService from 'src/api/AuthService';
import ConfigService from 'src/api/ConfigService';
import CountryService from 'src/api/CountryService';
import CustomerService from 'src/api/CustomerService';
import DashboardService from 'src/api/DashboardService';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------

export default function MainContainer({ children }) {
  const settings = useSettingsContext();
  const { getCountryData } = CountryService();
  const { getUserData } = AuthService();
  const { getConfigs } = ConfigService();
  const { getCustomers } = CustomerService();
  const { getNotifications } = DashboardService();
  const { configs } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(configs !== null);

  const loadData = async () => {
    await getUserData();
    setLoaded(true);
  };
  useEffect(() => {
    if (configs === null) {
      loadData();
      getCountryData();
      getNotifications();
      getCustomers();
    }
  }, []);

  if (!loaded) return <LoadingScreen />;

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={settings.themeStretch ? false : 'xl'}>
      {children}
    </Container>
  );
}
