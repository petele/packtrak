import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Checkbox,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import OrderLinkButton from './OrderLinkButton';
import TrackingLinkButton from './TrackingLinkButton';

import markAsDelivered from '../helpers/markAsDelivered';
import { formatToLongString, parseDateFromString } from '../helpers/dtHelpers';

export default function PackageTableRow(props) {
  const navigate = useNavigate();

  const row = props.row;

  const id = row.id;
  const kind = props.kind;
  const editURL = `/edit/${kind}/${id}`;

  // Get the formatted date
  const dtString = kind === 'incoming' ? row.dateExpected : row.dateDelivered;
  const dtValObj = parseDateFromString(dtString);
  const dtValFormatted = formatToLongString(dtValObj);

  function onCheckChange(e) {
    const uid = props.uid;
    markAsDelivered(uid, kind, id, e.target.checked);
  }

  function onRowClick(event) {
    navigate(editURL);
  }

  const myStyles = {
    '&:last-child td, &:last-child th': { border: 0 },
  };
  if (row.isOverdue) {
    myStyles['backgroundColor'] = '#ffebee';
  }
  if (row.isDueToday) {
    myStyles['backgroundColor'] = '#e3f2fd';
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
        {row.from}
        <Typography variant="caption" component="div">{row.what}</Typography>
      </TableCell>
      <TableCell>
        <OrderLinkButton row={row} />
        <TrackingLinkButton row={row} />
      </TableCell>
    </TableRow>
  );
}
