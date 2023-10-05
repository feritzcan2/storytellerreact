// _mock
import { _userAbout } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import ProfileCover from '../profile-cover';
//
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------

export default function UserProfileView({ userData }) {
  const settings = useSettingsContext();
  const customer = userData.customers[0];
  const { user } = useMockedUser();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[{ name: `${customer?.name} ${customer?.surname}` }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

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
      </Card>
      <ProfileHome userData={userData} />
    </Container>
  );
}
