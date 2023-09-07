import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Card, CardHeader, Container, IconButton, Tooltip, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSettingsContext } from 'src/components/settings';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function NotificationSettingsView(props) {
  const settings = useSettingsContext();

  return (
    <Container
      sx={{ position: 'absolute', bottom: 50 }}
      maxWidth={settings.themeStretch ? false : 'xl'}
    >
      <Typography variant="h4"> Bildirim ayarları</Typography>

      <Card sx={{ width: 1, mt: 5 }}>
        <CardHeader title="Email Listesi" />
        <EmailListTable />
      </Card>
    </Container>
  );
}
function EmailListTable() {
  let popover = {};
  let quickEdit = {};
  return (
    <TableContainer sx={{ mt: 1 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
              <IconButton color={'inherit'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton color={'inherit'} onClick={popover.onOpen}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton color={'inherit'} onClick={popover.onOpen}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
