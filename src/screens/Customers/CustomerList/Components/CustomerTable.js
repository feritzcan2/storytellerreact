import React, { useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { data } from "./makeData.ts";
import { MRT_Localization_TR } from "material-react-table/locales/tr.js";
const CustomerTable = () => {
  const averageSalary = useMemo(
    () => data.reduce((acc, curr) => acc + curr.priceTaken, 0) / data.length,
    []
  );

  const maxAge = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.phone), 0),
    []
  );

  const columns = useMemo(
    () => [
      {
        header: "İsim",
        accessorKey: "customerName",
        enableGrouping: false, //do not let this column be grouped
      },

      {
        header: "Telefon",
        accessorKey: "phone",
        aggregationFn: "max", //show the max phone in the group (lots of pre-built aggregationFns to choose from)
        //required to render an aggregated cell
      },
      {
        header: "Mail",
        accessorKey: "mail",
        //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
        GroupedCell: ({ cell, row }) => (
          <Box sx={{ color: "primary.main" }}>
            <strong>{cell.getValue()}s </strong> ({row.subRows?.length})
          </Box>
        ),
      },
      {
        header: "İşlem Durumu",
        accessorKey: "state",
      },
    ],
    [averageSalary, maxAge]
  );

  return (
    <MaterialReactTable
      localization={MRT_Localization_TR}
      columns={columns}
      data={data}
      enableColumnResizing
      enableGrouping
      enableStickyHeader
      enableStickyFooter
      initialState={{
        density: "compact",
        expanded: true, //expand all groups by default
        grouping: ["state"], //an array of columns to group by by default (can be multiple)
        pagination: { pageIndex: 0, pageSize: 20 },
        sorting: [{ id: "state", desc: false }], //sort by state by default
      }}
      muiToolbarAlertBannerChipProps={{ color: "primary" }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  );
};

export default CustomerTable;
