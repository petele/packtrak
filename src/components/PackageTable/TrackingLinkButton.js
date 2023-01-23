import * as React from 'react';

import {
  IconButton,
  Link,
} from '@mui/material';

import getTrackingURL from '../../helpers/getTrackingURL';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function TrackingLinkButton({row}) {
  const url = row.trackingURL || getTrackingURL(row.shipper, row.trackingNumber);
  const disabled = !url;

  return (
    <IconButton component={Link} href={url} disabled={disabled} target="_blank" rel="noreferrer" aria-label="tracking">
      <LocalShippingIcon />
    </IconButton>
  );
}
