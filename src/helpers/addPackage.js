import { db } from './fbHelper';
import { push, ref } from 'firebase/database';
import { gaEvent } from './gaHelper';

import validatePackageData from './validatePackageData';

/**
 * Add a package to the database
 *
 * @param {string} userID User ID
 * @param {object} data Package details
 * @param {string} data.dateExpected Date expected (YYYY-MM-DD)
 * @param {string} data.from Who the package is from
 * @param {string} data.what What's in the package
 * @param {string} data.shipper Who the shipper is
 * @param {?string} data.orderURL URL to order
 * @param {?string} data.trackingNumber Tracking number from shipper
 * @param {?string} data.trackingURL Tracking URL from shipper
 * @return {Promise<string>} Package ID
 */
export default async function addPackage(userID, data) {
  if (!userID || !data) {
    throw new Error(`Missing or invalid required param.`);
  }

  const isValid = validatePackageData(data);
  if (!isValid.valid) {
    throw new Error(isValid.reason);
  }

  gaEvent('package', 'add');

  const now = Date.now();
  data.delivered = false;
  data.dtAdded = now;
  data.dtUpdated = now;

  const queryPath = `userData/${userID}/data_v1/incoming`;

  try {
    const fbRef = ref(db, queryPath);
    const newRef = await push(fbRef, data);
    return newRef.key;
  } catch (ex) {
    console.error('Unable to add new package', queryPath, ex);
    throw ex;
  }
}
