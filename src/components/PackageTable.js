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

import { onValue, ref } from 'firebase/database';

import PackageTableRow from './PackageTableRow';

import { db } from '../helpers/fbHelper';
import parsePackageList from '../helpers/parsePackageList';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const userID = props.uid;
    const kind = props.kind;
    console.log('PackageTable userID:', userID, kind)
    const queryPath = `userData/${userID}/${kind}`;
    const query = ref(db, queryPath);
    return onValue(query, (snapshot) => {
      const pkgObj = snapshot.val();
      const reverse = kind === 'delivered';
      setRows(parsePackageList(pkgObj, reverse));
    });
  }, [props.kind, props.uid]);

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
            <PackageTableRow key={row.id} row={row} uid={props.uid} kind={props.kind} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
