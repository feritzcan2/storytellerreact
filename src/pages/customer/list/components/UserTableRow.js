import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//
import { useContext, useState } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';
import UserQuickEditForm from './UserQuickEditForm';

// ----------------------------------------------------------------------
const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

export default function UserTableRow({
  columns,
  row,
  configs,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}) {
  const { name, avatarUrl, surname, role, status, email, phoneNumber, id } = row;

  const [selectedDate, setSelectedDate] = useState(false);
  if (columns === undefined) return;

  const { customerList, setCustomers } = useContext(GlobalContext);

  const onSaveAppointmentDate = () => {
    let customers = [...customerList.customers];
    customerList.customers = customers;
    let customer = customers.filter((customer) => customer.id == id)[0];
    customer.appointmentDate = selectedDate;
    setCustomers(customerList);
  };
  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();
  const labelColor = (column, value, key) => {
    if (column.dataKey !== undefined && column.dataKey !== null) {
      return colors[row[column['key']] % colors.length];
    }
    if (isNullFilter(column) === true) return 'error';

    return 'success';
  };

  const isNullFilter = (column) => {
    if (
      column.filter != null &&
      column.filter.isNullFilter === true &&
      (row[column['key']] === undefined || row[column['key']] === null)
    )
      return true;

    return false;
  };
  function isDateValid(dateStr) {
    return dateStr !== 0 && !isNaN(new Date(dateStr));
  }
  const getCell = (column) => {
    let color = colors[0];
    let isNameMasked = column.filter != null && column.filter.isNullFilter === true;
    if (isNameMasked) {
    }

    let text =
      isNameMasked && (row[column['key']] === null || row[column['key']] === undefined)
        ? column.filter.options[1].label
        : isDateValid(row[column['key']])
        ? new Date(row[column['key']]).toLocaleDateString()
        : row[column['key']];
    if (column.dataKey !== undefined && column.dataKey !== null && isNameMasked !== true) {
      let data = configs[column.dataKey].filter((country) => country.id === row[column['key']])[0];

      text = configs[column.dataKey].filter((country) => country.id === row[column['key']])[0].name;
    }
    return (
      <TableCell
        key={column['key']}
        sx={column.isProfile ? { display: 'flex', alignItems: 'center' } : { whiteSpace: 'nowrap' }}
      >
        {column.isProfile && <Avatar sizes="sm" src={avatarUrl} sx={{ mr: 1 }} />}
        {column.isLabel === true && (
          <Label color={labelColor(column, row[column['key']])}>{text}</Label>
        )}
        {column.isLabel !== true && (
          <ListItemText
            primary={text}
            secondary={column['subKey'] !== undefined ? row[column['subKey']] : undefined}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        )}
      </TableCell>
    );
  };
  return (
    <>
      <TableRow key={row.id} hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        {columns.map((column) => {
          console.log(row);

          return getCell(column);
        })}
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Sil
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Düzenle
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Silmek istediğine emin misin?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Sil
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
