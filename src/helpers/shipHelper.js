
const _knownShippers = [
  'Amazon',
  'CDL',
  'DHL',
  'FedEx',
  'LaserShip',
  'UPS',
  'USPS',
  'Custom',
];

function _removeSpaces(trackingNumber) {
  return trackingNumber.replace(/ /g, '');
}

/**
 * Get the list of known/supported shippers.
 *
 * @return {<string>}
 */
export function getKnownShippers() {
  return _knownShippers;
}

/**
 * Return the name of the shipper if known.
 *
 * @param {string} trackingNumber Tracking number
 * @return {?string} Name of shipper (or null)
 */
export function guessShipper(trackingNumber) {
  return null;
}

/**
 * Returns a tracking URL for the specified shipper/tracking number.
 *
 * @param {string} shipper Name of the shipper
 * @param {string} trackingNumber Tracking number
 * @return {?string} Tracking URL for package/shipper
 */
export function getTrackingURL(shipper, trackingNumber) {
  if (!_knownShippers.includes(shipper) || !trackingNumber) {
    return null;
  }
  if (shipper === 'Amazon') {
    return null;
  }
  if (shipper === 'Custom') {
    return null;
  }
  if (shipper === 'CDL') {
    return `https://ship.cdldelivers.com/Xcelerator/Tracking/Tracking?packageitemrefno=${trackingNumber}`;
  }
  if (shipper === 'DHL') {
    return `https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingNumber}`;
  }
  if (shipper === 'FedEx') {
    return `https://www.fedex.com/fedextrack/?tracknumbers=${_removeSpaces(trackingNumber)}`;
  }
  if (shipper === 'LaserShip') {
    return `https://www.lasership.com/track/${trackingNumber}`;
  }
  if (shipper === 'UPS') {
    return `https://www.ups.com/track?loc=en_US&tracknum=${trackingNumber}`;
  }
  if (shipper === 'USPS') {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
  return null;
}
