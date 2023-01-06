import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PackageTableRow from './PackageTableRow';
import getPackageList from '../helpers/getPackageList';

import parsePackageList from '../helpers/parsePackageList';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState([]);

  const userID = props.uid;
  const kind = props.kind;

  React.useEffect(() => {
    return getPackageList(userID, kind, (snapshot) => {
      const pkgObj = snapshot.val();
      const reverse = kind === 'delivered';
      setRows(parsePackageList(pkgObj, reverse));
    });
  }, [userID, kind]);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="list of packages">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell padding="none"></TableCell>
            <TableCell>Date Expected</TableCell>
            <TableCell>From</TableCell>
            <TableCell>What</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <PackageTableRow key={row.id} row={row} uid={userID} kind={kind} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
