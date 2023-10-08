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
  iconSize = 15,
  radius = 18,
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
        aria-label="Bilgi"
        onClick={handleClick}
        sx={{
          minWidth: radius,
          minHeight: radius,
          marginLeft: 1,
        }}
      >
        <Iconify width={radius} height={radius} icon={buttonIcon || 'raphael:question'} />
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
        {helpLink && (
          <a href={helpLink} target="_blank" style={{ cursor: 'pointer' }}>
            <Typography color={colors.blue[600]} sx={{ p: 2 }}>
              {'Example Link'}
            </Typography>
          </a>
        )}
      </Popover>
    </div>
  );
}
