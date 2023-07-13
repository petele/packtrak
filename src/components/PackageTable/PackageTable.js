import * as React from 'react';

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import NoPackages from '../NoPackages';

import PackageTableBody from './PackageTableBody';
import getPackageList from '../../helpers/getPackageList';

import { gaError } from '../../helpers/gaHelper';
import SadPanda from '../SadPanda';

function _getWidth() {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'));
  const isWide = useMediaQuery(theme.breakpoints.up('md'));

  // Narrow, and not wide
  if (isNarrow && !isWide) {
    return 'sm';
  }

  // Not narrow and not wide
  if (!isNarrow && !isWide) {
    return 'md';
  }

  // Not narrow, and wide
  if (!isNarrow && isWide) {
    return 'lg';
  }
}


export default function PackageTable({kind}) {
  const [rows, setRows] = React.useState(null);
  const [error, setError] = React.useState(null);

  const dateLabel = kind === 'incoming' ? 'Expected' : 'Delivered';

  const width = _getWidth();

  React.useEffect(() => {
    return getPackageList(kind, (packages) => {
      setRows(packages);
    }, (err) => {
      gaError('get_package_list_failed', true, err);
      setError(err);
    });
  }, [kind]);

  if (rows && rows.length === 0) {
    return (<NoPackages />);
  }

  const sxDate = {};
  const sxFrom = {};
  const sxTracking = {};

  if (width === 'lg') {
    sxDate.width = '30%';
    sxTracking.width = '30%';
  } else if (width === 'md') {
    sxDate.width = '160px';
    sxTracking.width = '180px';
  } else {
    sxDate.width = '20%';
    sxTracking.width = '115px';
  }

  if (error) {
    return (<SadPanda reason="an error occured" />)
  }

  return (
    <TableContainer component={Paper} sx={{mb: 12}}>
      <Table size="small" aria-label="list of packages">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell sx={sxDate}>{dateLabel}</TableCell>
            <TableCell sx={sxFrom}>From</TableCell>
            <TableCell sx={sxTracking}>Links</TableCell>
          </TableRow>
        </TableHead>
        <PackageTableBody rows={rows} kind={kind} width={width} />
      </Table>
    </TableContainer>
  );
}
