import { useState } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
// routes
// _mock
// hooks
// components
import Label from 'src/components/label';
//

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
export default function UserListFilters({ column, configs }) {
  const defaultFilters = {};

  const filtersData = { status: configs.customerStatuses };

  const [filters, setFilters] = useState(defaultFilters);

  return (
    <Tabs
      value={0}
      onChange={(event, value) => {
        handleFilterStatus(event, value, column.key);
      }}
      sx={{
        px: 2.5,
        boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
      }}
    >
      {filtersData.status.map((filter, index) => {
        return (
          <Tab
            key={filter.id + index}
            iconPosition="end"
            value={filter.id}
            label={filter.name}
            icon={
              <Label
                variant={(filters[filter.id] == filter.id && 'filled') || 'soft'}
                color={colors[index % colors.length]}
              >
                {filter.value === 'all' && customers.length}

                {filter.value === 'True' &&
                  customers.filter(
                    (user) => user[column['key']] !== undefined && user[column['key']] !== null
                  ).length}
                {filter.value === 'False' &&
                  customers.filter(
                    (user) => user[column['key']] === undefined || user[column['key']] === null
                  ).length}
              </Label>
            }
          />
        );
      })}
      {column !== undefined &&
        column.filter.isNullFilter === true &&
        column.filter.options.map((filter, index) => {
          return (
            <Tab
              key={filter.value + index}
              iconPosition="end"
              value={filter.value}
              label={filter.label}
              icon={
                <Label
                  variant={(filters[column.key] == filter.value && 'filled') || 'soft'}
                  color={colors[index % colors.length]}
                >
                  {filter.value === 'all' && customers.length}

                  {filter.value === 'True' &&
                    customers.filter(
                      (user) => user[column['key']] !== undefined && user[column['key']] !== null
                    ).length}
                  {filter.value === 'False' &&
                    customers.filter(
                      (user) => user[column['key']] === undefined || user[column['key']] === null
                    ).length}
                </Label>
              }
            />
          );
        })}
      {column !== undefined &&
        column.filter.isNullFilter === false &&
        column.filter.options.map((tab, index) => {
          return (
            <Tab
              key={column.key}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={(filters[column.key] == tab.value && 'filled') || 'soft'}
                  color={colors[index % colors.length]}
                >
                  {tab.value === 'all' && customers.length}
                  {tab.value !== 'all' &&
                    customers.filter((user) => user[column.key] === tab.label).length}
                </Label>
              }
            />
          );
        })}
    </Tabs>
  );
}
