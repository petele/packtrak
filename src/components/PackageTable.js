import * as React from 'react';

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import NoPackages from './NoPackages';

import PackageTableBody from './PackageTableBody';
import getPackageList from '../helpers/getPackageList';
import parsePackageList from '../helpers/parsePackageList';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState(null);

  const userID = props.uid;
  const kind = props.kind;

  React.useEffect(() => {
    return getPackageList(userID, kind, (snapshot) => {
      const pkgObj = snapshot.val();
      setRows(parsePackageList(pkgObj, kind));
    });
  }, [userID, kind]);

  const dateLabel = kind === 'incoming' ? 'Expected' : 'Delivered';

  if (rows && rows.length === 0) {
    return (<NoPackages />);
  }

  return (
    <TableContainer component={Paper} sx={{mb: 12}}>
      <Table size="small" aria-label="list of packages">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>{dateLabel}</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <PackageTableBody rows={rows} uid={props.uid} kind={kind} />
      </Table>
    </TableContainer>
  );
}
