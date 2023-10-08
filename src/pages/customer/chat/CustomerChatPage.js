import { Helmet } from 'react-helmet-async';
// sections
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { GlobalContext } from 'src/context/GlobalProvider';
import MainContainer from 'src/pages/mainContainer';
import { ChatView } from './view';

// ----------------------------------------------------------------------

export default function CustomerChatPage() {
  const { configs } = useContext(GlobalContext);
  console.log(configs);
  const settings = useSettingsContext();
  const { customerList } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title> Mesajlar</title>
      </Helmet>
      <Typography variant="h4">Mesajlaşma ( Whatsapp + Email)</Typography>
      <MainContainer>
        <ChatView />
      </MainContainer>
    </>
  );
}
