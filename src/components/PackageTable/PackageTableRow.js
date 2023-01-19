import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Checkbox,
  Link,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import OrderLinkButton from './OrderLinkButton';
import TrackingLink from './TrackingLink';
import TrackingLinkButton from './TrackingLinkButton';

import markAsDelivered from '../../helpers/markAsDelivered';
import { formatToString,  parseDateFromString } from '../../helpers/dtHelpers';

export default function PackageTableRow({row, kind, width}) {
  const navigate = useNavigate();

  const id = row.id;
  const editURL = `/edit/${kind}/${id}`;

  // Get the formatted date
  const dtString = kind === 'incoming' ? row.dateExpected : row.dateDelivered;
  const dtValObj = parseDateFromString(dtString);
  const dtValFormatted = formatToString(dtValObj, width === 'sm');

  function onCheckChange(e) {
    markAsDelivered(kind, id, e.target.checked);
  }

  function onRowClick(event) {
    navigate(editURL);
  }

  const myStyles = {
    '&:last-child td, &:last-child th': { border: 0 },
  };
  if (row.isOverdue) {
    myStyles['backgroundColor'] = 'rowOverdue';
  }
  if (row.isDueToday) {
    myStyles['backgroundColor'] = 'rowToday'
  }

  const pointerStyle = {
    cursor: 'pointer !important',
  };

  return (
    <TableRow
      key={row.id}
      sx={myStyles}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={row.delivered}
          onChange={onCheckChange}
        />
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        {dtValFormatted}
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        <Link variant="body2" color="inherit" component={RouterLink} to={editURL} underline="hover">
          {row.from}
        </Link>
        <Typography variant="caption" component="div">
          {row.what}
        </Typography>
      </TableCell>
      <TableCell>
        <OrderLinkButton row={row} />
        {width === 'sm' && (
          <TrackingLinkButton row={row} />
        )}
        {width !== 'sm' && (
          <TrackingLink row={row} width={width} />
        )}
      </TableCell>
    </TableRow>
  );
}
