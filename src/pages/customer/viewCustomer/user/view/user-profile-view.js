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
import { useParams } from 'src/routes/hooks';
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------

export default function UserProfileView({ customerId, session, setShouldRefetch }) {
  const params = useParams();
  const settings = useSettingsContext();
  const { user } = useMockedUser();
  let customer = session.customers.find((customer) => customer.id === customerId);
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
      <ProfileHome session={session} customer={customer} setShouldRefetch={setShouldRefetch} />
    </Container>
  );
}
