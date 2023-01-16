import * as React from 'react';

import {
  Link,
} from '@mui/material';

import getTrackingURL from '../helpers/getTrackingURL';

class TrackingLink extends React.Component {

  getLabel(trackingNumber) {
    if (typeof trackingNumber !== 'string') {
      return null;
    }
    if (this.props.width === 'lg') {
      return trackingNumber;
    }
    if (trackingNumber.length < 17) {
      return trackingNumber;
    }
    const len = trackingNumber.length;
    const start = trackingNumber.substring(0, 2);
    const end = trackingNumber.substring(len - 6);
    return `${start}...${end}`;
  }

  render() {
    const shipper = this.props.row.shipper;
    const trackingNumber = this.props.row.trackingNumber;
    const url = getTrackingURL(shipper, trackingNumber);
    const label = this.getLabel(trackingNumber);

    if (url && label) {
      return (
        <Link href={url} target="_blank" rel="noreferrer">
          {label}
        </Link>
      );
    }
    return null;
  }
}

export default TrackingLink;
