import isEqual from 'lodash/isEqual';
import { useCallback, useContext, useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
//
import CustomerService from 'src/api/CustomerService';
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import UserTableFiltersResult from './components/UserTableFiltersResult';
import UserTableRow from './components/UserTableRow';
import UserTableToolbar from './components/UserTableToolbar';

// ----------------------------------------------------------------------

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
// ----------------------------------------------------------------------

export default function UserListView(props) {
  const { configs } = useContext(GlobalContext);

  if (props.tableData === null || props.tableData === undefined || configs === null)
    return <LoadingScreen />;

  const { columns, customers } = props.tableData;
  const [TABLE_HEAD, setTableHead] = useState([]);
  const table = useTable();
  const [filters, setFilters] = useState({});

  const defaultFilters = {};
  useEffect(() => {
    let head = [];
    props.tableData.columns.forEach((element, index) => {
      head.push({ id: element.id, label: element.columnName, width: index < 3 ? 140 : 80 });
      if (element.filter !== undefined && element.filter !== null) defaultFilters[element.key] = -1;
    });
    head.push({ id: 'ss', label: '', width: 35 });
    setFilters(defaultFilters);
    setTableData(props.tableData.customers);
    setTableHead(head);
  }, [props.tableData, props.tableData.customers]);

  const settings = useSettingsContext();
  const { deleteCustomer } = CustomerService();
  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);

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
      deleteCustomer(id).then(() => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);

        table.onUpdatePageDeleteRow(dataInPage.length);
      });
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
      <Container
        sx={{ minWidth: '100%', padding: 0, margin: 0 }}
        maxWidth={settings.themeStretch ? false : 'lg'}
      >
        <Card>
          {columns
            .filter(
              (column) =>
                column.filter !== undefined &&
                column.filter !== null &&
                filters[column.key] !== undefined
            )
            .map((column) => {
              return (
                <Tabs
                  key={column.key}
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
                    column.filter.options.map((filter, index) => {
                      return (
                        <Tab
                          key={filter.label + index}
                          iconPosition="end"
                          value={filter.value}
                          label={filter.label}
                          icon={
                            <Label
                              variant={(filters[column.key] == filter.value && 'filled') || 'soft'}
                              color={colors[index % colors.length]}
                            >
                              {filter.value === -1 && customers.length}

                              {filter.value === 1 &&
                                customers.filter(
                                  (user) =>
                                    user[column['key']] !== undefined &&
                                    user[column['key']] !== null
                                ).length}
                              {filter.value === 0 &&
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
                    column.filter.options.map((tab, index) => {
                      return (
                        <Tab
                          key={column.filter.label + column.key + 'isNullFilter' + index}
                          iconPosition="end"
                          value={tab.value}
                          label={tab.label}
                          icon={
                            <Label
                              variant={(filters[column.key] == tab.value && 'filled') || 'soft'}
                              color={colors[index % colors.length]}
                            >
                              {tab.value === -1 && customers.length}
                              {tab.value !== -1 &&
                                customers.filter((user) => user[column.key] === tab.value).length}
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
                  {dataFiltered &&
                    dataFiltered.length > 0 &&
                    dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <UserTableRow
                          configs={configs}
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
      (user) =>
        user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        user.surname.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  columns.forEach((column) => {
    if (column.filter !== undefined && column.filter !== null) {
      let filter = filters[column.key];
      if (filter !== null && filter !== undefined && filter !== -1) {
        if (column.filter.isNullFilter === false) {
          inputData = inputData.filter((user) => user[column.key] === filter);
        } else {
          if (filter === 1) {
            inputData = inputData.filter(
              (user) => user[column['key']] !== undefined && user[column['key']] !== null
            );
          } else if (filter === 0) {
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
