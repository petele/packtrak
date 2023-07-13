import { logger } from "./ConsoleLogger";

const _knownShippers = [
  'Amazon',
  'CDL',
  'DHL',
  'FedEx',
  'LaserShip',
  'OnTrac',
  'Swiftpost',
  'UPS',
  'USPS',
  'Custom',
];

const _allowedManualTrackingShippers = [
  'Amazon',
  'Custom',
];

const _trackingURLPatterns = [
  {
    name: 'Amazon',
    pattern: new RegExp(/^TB[A-D][0-9]{12}/),
  },
  {
    name: 'DHL',
    pattern: new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i),
  },
  {
    name: 'FedEx',
    pattern: new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3}|\d{15})?)\b/i),
  },
  {
    name: 'OnTrac',
    pattern: new RegExp(/\b(C\d{14})\b/i),
  },
  {
    name: 'Swiftpost',
    pattern: new RegExp(/^SP.{20}$/i),
  },
  {
    name: 'UPS',
    pattern: new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i),
  },
  {
    name: 'USPS',
    pattern: new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i),
  },
  {
    name: 'USPS',
    pattern: new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i),
  },
  {
    name: 'USPS',
    pattern: new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i),
  }
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
 * Get the list of shippers allowed to provide a manual tracking URL.
 *
 * @return {<string>}
 */
export function getAllowedManualTrackingShippers() {
  return _allowedManualTrackingShippers;
}

/**
 * Return the name of the shipper if known.
 *
 * @param {string} trackingNumber Tracking number
 * @return {?string} Name of shipper (or null)
 */
export function guessShipper(trackingNumber) {
  const result = _trackingURLPatterns.filter((shipper) => {
    if (shipper.pattern.test(trackingNumber)) {
      return true;
    }
    return false;
  });
  if (result.length === 0) {
    return null;
  }
  if (result.length === 1) {
    return result[0].name;
  }
  logger.warn('shipHelper - multiple shippers', result);
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
  if (shipper === 'OnTrac') {
    return `https://www.ontrac.com/trackres.asp?tracking_number=${trackingNumber}`;
  }
  if (shipper === 'Swiftpost') {
    return `https://www.swiftpost.com/tracking?t=${trackingNumber}`;
  }
  if (shipper === 'UPS') {
    return `https://www.ups.com/track?loc=en_US&tracknum=${trackingNumber}`;
  }
  if (shipper === 'USPS') {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
  return null;
}
