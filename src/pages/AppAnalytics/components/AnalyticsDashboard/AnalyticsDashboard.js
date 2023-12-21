import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { appsData } from "../../../../data/appsData";
import { appReader } from "./analyticsDashboard.constants";
import cx from "classnames";
import styles from "./analyticsDashboard.module.scss";

const columns = [
  {
    id: 1,
    width: 300,
    label: "App",
    dataKey: appReader.app,
  },
  {
    id: 2,
    width: 120,
    label: "Category",
    dataKey: appReader.category,
  },
  {
    id: 3,
    width: 120,
    label: "Rating",
    dataKey: appReader.rating,
  },
  {
    id: 4,
    width: 120,
    label: "Reviews",
    dataKey: appReader.reviews,
  },
  {
    id: 5,
    width: 120,
    label: "Size",
    dataKey: appReader.size,
  },
  {
    width: 120,
    label: "Installs",
    dataKey: appReader.installs,
  },
  {
    width: 120,
    label: "Type",
    dataKey: appReader.type,
  },
  {
    width: 120,
    label: "Content Rating",
    dataKey: appReader.contentRating,
  },
  {
    width: 120,
    label: "Genre",
    dataKey: appReader.genres,
  },
  {
    width: 120,
    label: "Last Updated",
    dataKey: appReader.lastUpdated,
  },
  {
    width: 120,
    label: "Current Version",
    dataKey: appReader.currentVersion,
  },
  {
    width: 120,
    label: "Android Version",
    dataKey: appReader.androidVersion,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width, fontWeight: "bold" }}
          sx={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          className={cx({ [styles.evenRowContainer]: _index % 2 === 0 })}
          key={column.id}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.id === 1 ? (
            <b styles={{ whitespace: "nowrap" }}>{column.dataKey(row)}</b>
          ) : (
            column.dataKey(row)
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

function BasicTable() {
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={appsData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default BasicTable;
