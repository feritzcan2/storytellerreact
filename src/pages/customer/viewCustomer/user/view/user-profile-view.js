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

export default function UserProfileView({ customer, setShouldRefetch }) {
  const params = useParams();
  const { id } = params;
  const settings = useSettingsContext();
  const { user } = useMockedUser();
  if (customer) {
    // Found the customer with ID 111
    console.log(customer);
  } else {
    // Customer with ID 111 not found
    console.log('Customer not found');
  }

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
      <ProfileHome customer={customer} setShouldRefetch={setShouldRefetch} />
    </Container>
  );
}
