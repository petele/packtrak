import Ajv from "ajv";
const ajv = new Ajv();

ajv.addFormat('ptDate', /^20[2-9]\d-[0-1]\d-[0-3]\d$/);
ajv.addFormat('ptURL', /^https?:\/\/.*$/)

const packageSchema = {
  type: 'object',
  properties: {
    delivered: {type: 'boolean'},
    dateExpected: {type: 'string', format: 'ptDate'},
    from: {type: 'string'},
    what: {type: 'string'},
    shipper: {type: 'string', nullable: true},
    trackingNumber: {type: 'string', nullable: true},
    trackingURL: {type: 'string', format: 'ptURL', nullable: true},
    orderURL: {type: 'string', format: 'ptURL', nullable: true},
  },
  required: ['delivered', 'dateExpected', 'from', 'what'],
  additionalProperties: false,
};


function _cleanString(val) {
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

const _validatePackage = ajv.compile(packageSchema);

/**
 * Trims/cleans fields in a package data object.
 *
 * @param {object} data Package data object
 * @return {object}
 */
export function cleanPackageObject(data) {
  data.dateExpected = _cleanString(data.dateExpected);
  data.from = _cleanString(data.from);
  data.what = _cleanString(data.what);
  data.shipper = _cleanString(data.shipper);
  data.trackingNumber = _cleanString(data.trackingNumber);
  data.trackingURL = null;
  data.orderURL = _cleanString(data.orderURL);
  if (data.shipper === 'Custom') {
    data.trackingURL = _cleanString(data.trackingURL);
  }
  return data;
}

/**
 * Validates a package data object.
 *
 * @param {object} data Package data object
 * @return {object}
 */
export function validatePackage(data) {
  const valid = _validatePackage(data);
  if (valid) {
    return {valid: true};
  }
  console.log(data, _validatePackage.errors);
  return {valid: false, errors: _validatePackage.errors};
}
