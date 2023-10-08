import { Helmet } from 'react-helmet-async';
// sections
import { Container, Typography } from '@mui/material';
import { useContext } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
import { GlobalContext } from 'src/context/GlobalProvider';
import { ChatView } from './view';

// ----------------------------------------------------------------------

export default function CustomerChatPage() {
  const { configs } = useContext(GlobalContext);
  console.log(configs);
  const settings = useSettingsContext();
  const { customerList } = useContext(GlobalContext);

  if (configs === null || customerList === null) return <LoadingScreen />;
  return (
    <>
      <Helmet>
        <title> Müşteri Ekle</title>
      </Helmet>
      <Typography variant="h4">Yeni müşteri ekle</Typography>
      <Container sx={{ marginLeft: 0 }} maxWidth={settings.themeStretch ? false : 'lg'}>
        <ChatView />
      </Container>
    </>
  );
}
