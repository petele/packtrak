import { getKnownShippers, getAllowedManualTrackingShippers } from "./shipHelper";

const _knownShippers = getKnownShippers();
const _allowedManualTrackingShippers = getAllowedManualTrackingShippers();
const _testDT = (val) => /^20[2-9]\d-[0-1]\d-[0-3]\d$/.test(val);
const _testURL = (val) => /^https?:\/\/.*$/.test(val);
const _testShipper = (val) => _knownShippers.includes(val);
const _testAmazonOrderID = (val) => /^\d{3}-\d{7}-\d{7}$/.test(val);

const requiredKeys = ['delivered', 'dateExpected', 'from', 'what'];
const schema = {
  delivered: {type: 'boolean'},
  dateExpected: {type: 'string', validator: _testDT},
  dateDelivered: {type: 'string', validator: _testDT},
  from: {type: 'string'},
  what: {type: 'string'},
  shipper: {type: 'string', validator: _testShipper},
  trackingNumber: {type: 'string'},
  trackingURL: {type: 'string', validator: _testURL},
  orderURL: {type: 'string', validator: _testURL},
  amzOrderID: {type: 'string', validator: _testAmazonOrderID},
}

function _isValueOK(value, nullable, expectedType, validator) {
  if (nullable && (value === undefined || value === null)) {
    return true;
  }
  if (!nullable && (value === undefined || value === null)) {
    return false;
  }
  if (typeof value !== expectedType) {
    return false;
  }
  if (validator && !validator(value)) {
    return false;
  }
  return true;
}

/**
 * Validates a package data object.
 *
 * @param {object} data Package data object
 * @param {boolean} checkForRequired Fail if required fields are not included.
 * @return {Array} Array of errors, if valid, array is empty.
 */
export function validatePackage(data, checkForRequired) {
  const invalidProps = new Set();
  const extraProps = new Set(Object.keys(data));
  Object.keys(schema).forEach((key) => {
    extraProps.delete(key);
    const propInfo = schema[key];

    const value = data[key];
    const type = propInfo.type;
    const validator = propInfo.validator;

    let nullable = true;
    if (checkForRequired) {
      if (requiredKeys.includes(key)) {
        nullable = false;
      }
      if (key === 'dateDelivered' && data.delivered === true) {
        nullable = false;
      }
    }

    if (key === 'trackingURL' && data.trackingURL && !_allowedManualTrackingShippers.includes(data.shipper)) {
      invalidProps.add('shipper/trackingURL');
    }

    const isValid = _isValueOK(value, nullable, type, validator);
    if (!isValid) {
      invalidProps.add(key);
    }
  });

  if (invalidProps.size === 0 && extraProps.size === 0) {
    return [];
  }

  for (const extraProp of extraProps) {
    invalidProps.add(extraProp);
  }

  return [...invalidProps];
}
