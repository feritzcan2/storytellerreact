// import Iconify from 'src/components/iconify';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import CardHeader from '@mui/material/CardHeader';
// import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

export default function CustomVerticalStatus({ customer }) {
  return (
    <Card
      spacing={2}
      sx={{
        px: 20,
        pb: 1,
        pt: 1.5,
        bgcolor: 'background.neutral',
      }}
    >
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider minWidth={1000} sx={{ borderStyle: 'dashed', mixWidth: 1000 }} />
      asdasdas
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Divider sx={{ borderStyle: 'dashed' }} />
      asdasdasd
    </Card>
  );
}
