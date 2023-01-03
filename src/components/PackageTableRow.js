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

class PackageTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(e) {
    const uid = this.props.uid;
    const kind = this.props.kind;
    const id = this.props.row.id;
    markAsDelivered(uid, kind, id, e.target.checked);
  }

  render() {
    const row = this.props.row;

    // Get the date by splitting
    const dtSplit = row.dateExpected.split('-');
    const dtExpected = new Date();
    dtExpected.setFullYear(parseInt(dtSplit[0]));
    dtExpected.setMonth(parseInt(dtSplit[1]) - 1);
    dtExpected.setDate(parseInt(dtSplit[2]));

    // Format the date
    const opts = {dateStyle: 'full'};
    const dtFormatter = new Intl.DateTimeFormat('lookup', opts);
    const dtExpectedFormatted = dtFormatter.format(dtExpected);

    const kind = this.props.kind;
    const editURL = `/edit/${kind}/${row.id}`;

    return (
      <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={row.delivered}
            onChange={this.onCheckChange} />
        </TableCell>
        <TableCell align="center">
          <IconButton href={editURL} aria-label="edit" onClick={this.onEditClick}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dtExpectedFormatted}
        </TableCell>
        <TableCell>
          <OrderFromLink row={row} />
        </TableCell>
        <TableCell>{row.what}</TableCell>
        <TableCell>
          <TrackingLink row={row} />
        </TableCell>
      </TableRow>
    );
  }
}

export default PackageTableRow;
