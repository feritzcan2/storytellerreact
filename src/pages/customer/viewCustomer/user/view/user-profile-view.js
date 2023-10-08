// _mock
import { _userAbout } from 'src/_mock';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Card from '@mui/material/Card';

import ProfileCover from '../profile-cover';
//
import { Stack, Tab, Tabs, Typography, tabsClasses } from '@mui/material';
import { useCallback, useState } from 'react';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { ChatView } from 'src/pages/customer/chat/view';
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------
const TABS = [
  {
    value: 'profile',
    label: 'Dosyalar',
    icon: <Iconify icon="solar:gallery-wide-bold" width={30} />,
  },
  {
    value: 'chat',
    label: (
      <Stack direction={'row'}>
        <Typography sx={{ marginRight: 2 }}>Mesajlar</Typography>
        <Label color="success">+3</Label>
      </Stack>
    ),
    icon: <Iconify icon="solar:chat-line-bold-duotone" width={30} />,
  },
];
export default function UserProfileView({ customerId, session, setShouldRefetch }) {
  const { user } = useMockedUser();
  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);
  let customer = session.customers.find((customer) => customer.id === customerId);
  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          name={`${customer?.name} ${customer?.surname}`}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        />
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>
      {currentTab === 'profile' && (
        <ProfileHome session={session} customer={customer} setShouldRefetch={setShouldRefetch} />
      )}

      {currentTab === 'chat' && <ChatView customerId={customer.id}></ChatView>}
    </>
  );
}
