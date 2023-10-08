import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import MainContainer from 'src/pages/mainContainer';
import EmailListView from './list/EmailList';
// ----------------------------------------------------------------------

export default function NotificationSettingsPage(props) {
  const settings = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Bildirim ayarları</title>
      </Helmet>
      <Typography variant="h4">Bildirim ayarları</Typography>

      <MainContainer>
        <Typography variant="h6"> Mail Listesi</Typography>

        <EmailListView />
      </MainContainer>
    </>
  );
}
