import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { db } from '../helpers/fbHelper';
import { onValue, ref } from 'firebase/database';

import PackageTableRow from './PackageTableRow';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const userID = 'petele';
    const kind = props.kind;
    const queryPath = `userData/${userID}/${kind}`;
    const query = ref(db, queryPath);
    return onValue(query, (snapshot) => {
      if (!snapshot.exists()) {
        setRows([]);
        return;
      }
      const pkgObj = snapshot.val();
      const pkgList = Object.keys(pkgObj).map((key) => {
        const pkg = pkgObj[key];
        pkg.id = key;
        return pkg;
      });
      setRows(pkgList);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="list of packages">
        <TableHead>
          <TableRow>
            <TableCell>Delivered</TableCell>
            <TableCell></TableCell>
            <TableCell>Date Expected</TableCell>
            <TableCell>From</TableCell>
            <TableCell>What</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <PackageTableRow  key={row.id} row={row} kind={props.kind} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
