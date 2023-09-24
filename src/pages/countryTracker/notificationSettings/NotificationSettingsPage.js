import { Helmet } from 'react-helmet-async';
// sections
import { useSettingsContext } from 'src/components/settings';
import { Container, Typography, Button } from '@mui/material';
import EmailListView from './list/EmailList';
import CountryService from 'src/api/CountryService';
import Iconify from 'src/components/iconify/iconify';
// ----------------------------------------------------------------------

export default function NotificationSettingsPage(props) {
  const settings = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> CountryTrackerPage: ss</title>
      </Helmet>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Mail Listesi</Typography>

        <EmailListView />
      </Container>
    </>
  );
}
