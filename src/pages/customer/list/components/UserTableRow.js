import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import UserQuickEditForm from './UserQuickEditForm';
import {
  DateCalendar,
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fragment, useContext, useState } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';

// ----------------------------------------------------------------------
const NEGATIVE_LABEL_TEXTS = ['Randevu Yok'];

export default function UserTableRow({
  columns,
  row,
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
    debugger;
    setCustomers(customerList);
  };
  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();
  const labelColor = (column, value, key) => {
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
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        {columns.map((column) => {
          console.log(row);

          return (
            <TableCell
              sx={
                column.isProfile
                  ? { display: 'flex', alignItems: 'center' }
                  : { whiteSpace: 'nowrap' }
              }
            >
              {column.isProfile && <Avatar sizes="sm" alt={name} src={avatarUrl} sx={{ mr: 1 }} />}
              {column.isLabel === true && (
                <Label color={labelColor(column, row[column['key']])}>
                  {column.filter != null && column.filter.isNullFilter === true
                    ? column.filter.options[1].label
                    : row[column['key']]}
                </Label>
              )}
              {column.isLabel !== true && (
                <ListItemText
                  primary={row[column['key']]}
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
