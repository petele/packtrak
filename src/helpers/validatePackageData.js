import { getKnownShippers } from "./shipHelper";

const _knownShippers = getKnownShippers();
const _testDT = (val) => /^20[2-9]\d-[0-1]\d-[0-3]\d$/.test(val);
const _testURL = (val) => /^https?:\/\/.*$/.test(val);
const _testShipper = (val) => _knownShippers.includes(val);

const schema = {
  delivered: {type: 'boolean'},
  dateExpected: {type: 'string', validator: _testDT},
  dateDelivered: {type: 'string', nullable: true, validator: _testDT},
  from: {type: 'string'},
  what: {type: 'string'},
  shipper: {type: 'string', nullable: true, validator: _testShipper},
  trackingNumber: {type: 'string', nullable: true},
  trackingURL: {type: 'string', validator: _testURL, nullable: true},
  orderURL: {type: 'string', validator:_testURL, nullable: true},
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

function _trimString(val) {
  if (val === null || val === undefined) {
    return null;
  }
  if (typeof val === 'string') {
    const result = val.trim();
    if (result === '') {
      return null;
    }
    return result;
  }
  return null;
}

/**
 * Trims/cleans fields in a package data object.
 *
 * @param {object} data Package data object
 * @return {object}
 */
export function cleanPackageObject(data) {
  const result = {
    delivered: !!data.delivered,
    dateExpected: _trimString(data.dateExpected),
    dateDelivered: _trimString(data.dateDelivered),
    from: _trimString(data.from),
    what: _trimString(data.what),
    trackingNumber: _trimString(data.trackingNumber),
    shipper: _trimString(data.shipper),
    trackingURL: _trimString(data.trackingURL),
    orderURL: _trimString(data.orderURL),
  };
  return result;
}

/**
 * Validates a package data object.
 *
 * @param {object} data Package data object
 * @return {object}
 */
export function validatePackage(data) {
  const invalidProps = new Set();
  const extraProps = new Set(Object.keys(data));
  Object.keys(schema).forEach((key) => {
    extraProps.delete(key);
    const propInfo = schema[key];

    const value = data[key];
    const type = propInfo.type;
    const validator = propInfo.validator;

    let nullable = !!propInfo.nullable;
    if (key === 'dateDelivered' && data.delivered === true) {
      nullable = false;
    }

    if (key === 'trackingURL' && data.trackingURL && data.shipper !== 'Custom') {
      invalidProps.add('shipper/trackingURL');
    }

    const isValid = _isValueOK(value, nullable, type, validator);
    if (!isValid) {
      invalidProps.add(key);
    }
  });

  if (invalidProps.size === 0 && extraProps.size === 0) {
    return {valid: true};
  }

  for (const extraProp of extraProps) {
    invalidProps.add(extraProp);
  }

  return {valid: false, errors: [...invalidProps]};
}
