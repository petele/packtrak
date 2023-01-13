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
    if (trackingNumber.length < 16) {
      return trackingNumber;
    }
    const start = trackingNumber.substr(0, 4);
    const end = trackingNumber.substr(-6);
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
