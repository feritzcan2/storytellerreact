// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// routes
// locales
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { user } = useMockedUser();

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Typography variant="subtitle2" noWrap>
          Ferit Özcan
        </Typography>
        <Typography variant="caption" noWrap>
          7/24 whatsapp ve mail üzerinden ulaşabilirsiniz.
        </Typography>
        <Stack direction={'row'} spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Iconify icon="solar:phone-bold" />
          <Typography variant="subtitle2" noWrap>
            +90532-559-6676
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Iconify icon="fluent:mail-24-filled" />

          <Typography variant="subtitle2" noWrap>
            feritzcan93@gmail.com
          </Typography>
        </Stack>

        <Button variant="contained" target="_blank" rel="noopener">
          Vize defterine ulaş
        </Button>
      </Stack>
    </Stack>
  );
}
