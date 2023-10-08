// sections

import { Container } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function MainContainer({ children }) {
  const settings = useSettingsContext();

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={settings.themeStretch ? false : 'xl'}>
      {children}
    </Container>
  );
}
