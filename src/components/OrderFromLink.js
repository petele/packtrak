import * as React from 'react';

import {
  Box,
  Link
} from '@mui/material';

class OrderFromLink extends React.Component {
  render() {
    const row = this.props.row;
    if (row.orderURL) {
      return (
        <Link to={row.orderURL} target="_blank" rel="noreferrer">
          {row.from}
        </Link>
      );
    }
    return (<Box>{row.from}</Box>);
  }
}

export default OrderFromLink;
