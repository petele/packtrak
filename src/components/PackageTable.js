import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PackageTableRow from './PackageTableRow';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    fetch(`/tempData/${props.kind}.json`)
      .then(res => res.json())
      .then((result) => {
        setRows(result);
      })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="list of packages">
        <TableHead>
          <TableRow>
            <TableCell>Arrived</TableCell>
            <TableCell>Date Expected</TableCell>
            <TableCell>From</TableCell>
            <TableCell>What</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <PackageTableRow  key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
