import * as React from 'react';

import {
  Link,
} from '@mui/material';

import getTrackingURL from '../../helpers/getTrackingURL';
import { gaEvent } from '../../helpers/gaHelper';

function _getLabel(trackingNumber, width) {
  if (typeof trackingNumber !== 'string') {
    return null;
  }
  if (width === 'lg') {
    return trackingNumber;
  }
  if (trackingNumber.length < 15) {
    return trackingNumber;
  }
  const len = trackingNumber.length;
  const start = trackingNumber.substring(0, 3);
  const end = trackingNumber.substring(len - 5);
  return `${start}...${end}`;
}

export default function TrackingLink({row, width}) {
  function clickLink() {
    gaEvent('open_link_tracking');
  }

  if (row.trackingURL) {
    const url = row.trackingURL;
    const label = row.trackingNumber || 'Track';
    return (
      <Link href={url} target="_blank" onClick={clickLink} rel="noreferrer" underline="hover">
        {label}
      </Link>
    );
  }

  const shipper = row.shipper;
  const trackingNumber = row.trackingNumber;
  const url = getTrackingURL(shipper, trackingNumber);
  const label = _getLabel(trackingNumber, width);

  if (url && label) {
    return (
      <Link href={url} target="_blank" onClick={clickLink} rel="noreferrer" underline="hover">
        {label}
      </Link>
    );
  }
  if (label) {
    return (
      <Link disabled color="text.secondary" underline="none">
        {label}
      </Link>);
  }
  return null;
}
