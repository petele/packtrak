export default function getTrackingURL(shipper, trackingNumber) {
  if (!trackingNumber) {
    return null;
  }
  if (shipper === 'CDL') {
    return `https://ship.cdldelivers.com/Xcelerator/Tracking/Tracking?packageitemrefno=${trackingNumber}`;
  }
  if (shipper === 'DHL') {
    return `https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingNumber}`;
  }
  if (shipper === 'FedEx') {
    return `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`;
  }
  if (shipper === 'LaserShip') {
    return `https://www.lasership.com/track/${trackingNumber}`;
  }
  if (shipper === 'TBA') {
    return null;
  }
  if (shipper === 'UPS') {
    return `https://www.ups.com/track?loc=en_US&tracknum=${trackingNumber}`;
  }
  if (shipper === 'USPS') {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
  return null;
}
