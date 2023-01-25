import * as React from 'react';

import {
  IconButton,
  Link,
} from '@mui/material';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { gaEvent } from '../../helpers/gaHelper';

export default function TrackingLinkButton({row}) {

  const orderURL = row.orderURL;
  const orderURLDisabled = !row.orderURL;

  function clickButton() {
    gaEvent('open_link_order');
  }

  return (
    <IconButton component={Link} href={orderURL} onClick={clickButton} disabled={orderURLDisabled} target="_blank" rel="noreferrer" aria-label="order">
      <ReceiptLongIcon />
    </IconButton>
  );
}
