import * as React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  const [days, setDays] = React.useState(30);
  const [rows, setRows] = React.useState(null);
  const [error, setError] = React.useState(null);

  const dateLabel = kind === 'incoming' ? 'Expected' : 'Delivered';

  const width = _getWidth();

  React.useEffect(() => {
    return getPackageList(kind, days, (packages) => {
      setRows(packages);
    }, (err) => {
      gaError('get_package_list_failed', true, err);
      setError(err);
    });
  }, [kind, days]);

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

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TableContainer component={Paper} sx={{mb: 4}}>
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
      <FormControl sx={{ m: 0, minWidth: 120, mb: 12, float:'right' }} size="small">
        <InputLabel id="demo-select-small-label">Days</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={days}
          label="Days"
          onChange={handleDaysChange}
        >
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={90}>90</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
