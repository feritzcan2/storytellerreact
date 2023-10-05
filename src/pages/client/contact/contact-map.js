import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import NoSsr from '@mui/material/NoSsr';
import Typography from '@mui/material/Typography';
// config
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function ContactMap({ contacts }) {

  return (
    <NoSsr>
      <StyledRoot>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Address
              </Typography>

              <Typography component="div" variant="caption">
                {'popupInfo.address'}
              </Typography>

              <Typography
                component="div"
                variant="caption"
                sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
              >
                <Iconify icon="solar:phone-bold" width={14} sx={{ mr: 0.5 }} />
                {'popupInfo.phoneNumber'}
              </Typography>
      </StyledRoot>
    </NoSsr>
  );
}

ContactMap.propTypes = {
  contacts: PropTypes.array,
};
