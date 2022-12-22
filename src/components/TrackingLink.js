import * as React from 'react';

import getTrackingURL from "../helpers/getTrackingURL";

class TrackingLink extends React.Component {

  getTrackingURL(row) {
    if (row.trackingLink) {
      return {link: row.trackingLink, label: 'Track'};
    }
    if (!row.trackingNumber) {
      return null;
    }
    const url = getTrackingURL(row.shipper, row.trackingNumber);
    if (url) {
      return {
        label: row.trackingNumber,
        link: url,
      };
    }
    return null;
  }

  render() {
    const info = this.getTrackingURL(this.props.row);

    if (info) {
      return (
        <a href={info.link} target="_blank" rel="noreferrer">
          {info.label}
        </a>
      );
    }
    return '';
  }
}

export default TrackingLink;
