import * as React from 'react';

import {
  IconButton,
  Link,
} from '@mui/material';

import { getTrackingURL } from '../../helpers/shipHelper';
import { gaEvent } from '../../helpers/gaHelper';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function TrackingLinkButton({row}) {
  const url = row.trackingURL || getTrackingURL(row.shipper, row.trackingNumber);
  const disabled = !url;

  function clickLink() {
    gaEvent('open_link_tracking');
  }

  return (
    <IconButton component={Link} onClick={clickLink} href={url} disabled={disabled} target="_blank" rel="noreferrer" aria-label="tracking">
      <LocalShippingIcon />
    </IconButton>
  );
}
