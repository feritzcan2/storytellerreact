// _mock
import { _userAbout, _userFeeds, _userFollowers, _userFriends, _userGallery } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import ProfileCover from '../profile-cover';
//
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'followers',
    label: 'Followers',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'friends',
    label: 'Friends',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView({ userData }) {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          // { name: 'User', href: paths.dashboard.user.root },
          { name: user?.displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <div>{JSON.stringify(userData)}</div>

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={_userAbout.role}
          name={user?.displayName}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        />
      </Card>
      <ProfileHome info={_userAbout} posts={_userFeeds} />
    </Container>
  );
}
