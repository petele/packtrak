import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import TrackingLink from './TrackingLink';
import OrderFromLink from './OrderFromLink';

import markAsDelivered from '../helpers/markAsDelivered';
import { formatToLongString, parseDateFromString } from '../helpers/dtHelpers';

export default function PackageTableRow(props) {
  const navigate = useNavigate();

  const row = props.row;

  const id = row.id;
  const kind = props.kind;
  const editURL = `/edit/${kind}/${id}`;

  // Get the formatted date
  const dtExpected = parseDateFromString(row.dateExpected);
  const dtExpectedFormatted = formatToLongString(dtExpected);

  function onCheckChange(e) {
    const uid = props.uid;
    markAsDelivered(uid, kind, id, e.target.checked);
  }

  function onRowClick(event) {
    const elemType = event.target.tagName;
    if (elemType === 'A') {
      return;
    }
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
      <TableCell padding="none" align="center">
        <IconButton href={editURL} aria-label="edit">
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        {dtExpectedFormatted}
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        <OrderFromLink row={row} />
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        {row.what}
      </TableCell>
      <TableCell onClick={onRowClick} sx={pointerStyle}>
        <TrackingLink row={row} />
      </TableCell>
    </TableRow>
  );
}
