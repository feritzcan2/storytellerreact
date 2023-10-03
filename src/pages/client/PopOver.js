import * as React from 'react';

import Iconify from 'src/components/iconify';

import { colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function BasicPopover({
  popoverText,
  helpLink,
  buttonIcon,
  iconSize = 30,
  cricleSize = 50,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
        aria-label="settings"
        onClick={handleClick}
        sx={{
          width: cricleSize,
          height: cricleSize,
          background: 'rgba(145, 158, 171, 0.08);',
          marginLeft: 1,
        }}
      >
        <Iconify icon={buttonIcon || 'jam:alert'} width={iconSize} height={iconSize} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ maxWidth: 400 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{popoverText || 'No description provided'}</Typography>
        <a href={helpLink} style={{ cursor: 'pointer' }}>
          <Typography color={colors.blue[600]} sx={{ p: 2 }}>
            {'Example Link'}
          </Typography>{' '}
        </a>
      </Popover>
    </div>
  );
}
