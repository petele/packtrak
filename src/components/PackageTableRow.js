import * as React from 'react';

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

class PackageTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onCheckChange(e) {
    const uid = this.props.uid;
    const kind = this.props.kind;
    const id = this.props.row.id;
    markAsDelivered(uid, kind, id, e.target.checked);
  }

  onRowClick(event) {
    const elemType = event.target.tagName;
    if (elemType === 'A') {
      return;
    }
  }

  render() {
    const row = this.props.row;

    // Get the formatted date
    const dtExpected = parseDateFromString(row.dateExpected);
    const dtExpectedFormatted = formatToLongString(dtExpected);

    const kind = this.props.kind;
    const editURL = `/edit/${kind}/${row.id}`;

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
            onChange={this.onCheckChange}
          />
        </TableCell>
        <TableCell padding="none" align="center">
          <IconButton href={editURL} aria-label="edit" onClick={this.onEditClick}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell onClick={this.onRowClick} sx={pointerStyle}>
          {dtExpectedFormatted}
        </TableCell>
        <TableCell onClick={this.onRowClick} sx={pointerStyle}>
          <OrderFromLink row={row} />
        </TableCell>
        <TableCell onClick={this.onRowClick} sx={pointerStyle}>
          {row.what}
        </TableCell>
        <TableCell onClick={this.onRowClick} sx={pointerStyle}>
          <TrackingLink row={row} />
        </TableCell>
      </TableRow>
    );
  }
}

export default PackageTableRow;
