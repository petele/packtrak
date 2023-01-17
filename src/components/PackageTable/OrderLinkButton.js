import * as React from 'react';

import {
  IconButton,
  Link,
} from '@mui/material';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function TrackingLinkButton({row}) {

  const orderURL = row.orderURL;
  const orderURLDisabled = !row.orderURL;

  return (
    <IconButton component={Link} href={orderURL} disabled={orderURLDisabled} target="_blank" rel="noreferrer" aria-label="order">
      <ReceiptLongIcon />
    </IconButton>
  );
}
