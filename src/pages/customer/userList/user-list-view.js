import isEqual from 'lodash/isEqual';
import { useState, useCallback, Fragment } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// _mock
import { _userList, _roles, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import UserTableRow from './components/user-table-row';
import UserTableToolbar from './components/user-table-row';
import UserTableFiltersResult from './components/user-table-row';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// const defaultFilters = {
//   name: '',
//   role: [],
//   status: 'all',
// };

// ----------------------------------------------------------------------

const nullFilterOpions = ['all', 'True', 'False'];
export default function UserListView(props) {
  if (props.tableData === null) return <LoadingScreen />;

  const { columns, customers } = props.tableData;
  let TABLE_HEAD = [];
  const defaultFilters = {
    name: '',
    role: [],
  };

  columns.forEach((element) => {
    TABLE_HEAD.push({ id: element.id, label: element.columnName, width: 100 });
    if (element.Filter !== undefined && element.Filter !== null)
      defaultFilters[element.key] = 'all';
  });

  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(customers);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    columns,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue, filterKey) => {
      handleFilters(filterKey, newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Fragment
          action={
            <Button
              component={RouterLink}
              //  href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Yeni Müşteri
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Button
          sx={{ alignSelf: 'end' }}
          component={RouterLink}
          //  href={paths.dashboard.user.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New User
        </Button>
        <Card>
          {columns
            .filter((column) => column.filter !== undefined && column.filter !== null)
            .map((column) => {
              return (
                <Tabs
                  value={filters[column.key]}
                  onChange={(event, value) => {
                    handleFilterStatus(event, value, column.key);
                  }}
                  sx={{
                    px: 2.5,
                    boxShadow: (theme) =>
                      `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                  }}
                >
                  {column.filter.isNullFilter === true &&
                    nullFilterOpions.map((filter) => {
                      return (
                        <Tab
                          key={filter.toString()}
                          iconPosition="end"
                          value={filter}
                          label={
                            filter === 'True'
                              ? column.columnName + ' Var'
                              : filter === 'False'
                              ? column.columnName + ' Yok'
                              : 'Hepsi'
                          }
                          icon={
                            <Label
                              variant={
                                ((filter === 'all' || filter === filters.status) && 'filled') ||
                                'soft'
                              }
                            >
                              {filter === 'all' && customers.length}

                              {filter === 'True' &&
                                customers.filter(
                                  (user) =>
                                    user[column['key']] !== undefined &&
                                    user[column['key']] !== null
                                ).length}
                              {filter === 'False' &&
                                customers.filter(
                                  (user) =>
                                    user[column['key']] === undefined ||
                                    user[column['key']] === null
                                ).length}
                            </Label>
                          }
                        />
                      );
                    })}
                  {column.filter.isNullFilter === false &&
                    column.filter.options.map((tab) => {
                      return (
                        <Tab
                          key={column.key}
                          iconPosition="end"
                          value={tab.value}
                          label={tab.label}
                          icon={
                            <Label
                              variant={
                                ((tab.value === 'all' || tab.value === filters.status) &&
                                  'filled') ||
                                'soft'
                              }
                              color={
                                (tab.value === 'active' && 'success') ||
                                (tab.value === 'pending' && 'warning') ||
                                (tab.value === 'banned' && 'error') ||
                                'default'
                              }
                            >
                              {tab.value === 'all' && customers.length}
                              {tab.value !== 'all' &&
                                customers.filter((user) => user[column['key']] === tab.value)
                                  .length}
                            </Label>
                          }
                        />
                      );
                    })}
                </Tabs>
              );
            })}

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        columns={columns}
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, columns }) {
  const { name, status, role } = filters;
  const columnFilters = [];

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  columns.forEach((column) => {
    if (column.filter !== undefined && column.filter !== null) {
      let filter = filters[column.key];
      if (
        filter !== null &&
        filter !== undefined &&
        filter !== 'all' &&
        filter !== 'All' &&
        filter !== 'Hepsi'
      ) {
        if (column.filter.isNullFilter === false) {
          inputData = inputData.filter((user) => user[column.key] === filter);
        } else {
          if (filter === 'True') {
            inputData = inputData.filter(
              (user) => user[column['key']] !== undefined && user[column['key']] !== null
            );
          } else if (filter === 'False') {
            inputData = inputData.filter(
              (user) => user[column['key']] === undefined || user[column['key']] === null
            );
          }
        }
      }
    }
  });

  return inputData;
}
