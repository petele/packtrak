import * as React from 'react';

import { useTheme } from '@mui/material/styles';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
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
      setRows(parsePackageList(pkgObj, kind));
    });
  }, [userID, kind]);

  const dateLabel = kind === 'incoming' ? 'Expected' : 'Delivered';
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('sm'));

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
        <TableBody>
          {rows.map((row) => (
            <PackageTableRow key={row.id} row={row} uid={userID} kind={kind} wide={isWide} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
