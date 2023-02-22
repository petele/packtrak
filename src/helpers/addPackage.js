import { db, getUserID } from './fbHelper';
import { push, ref } from 'firebase/database';

import { validatePackage } from './validatePackageData';
import { logger } from './ConsoleLogger';

/**
 * Add a package to the database
 *
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
export default async function addPackage(data) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!data) {
    throw new Error(`No data`);
  }

  const errors = validatePackage(data, true);

  if (errors.length > 0) {
    logger.error('Validation failed.', data, errors);
    throw new Error('Validation failed');
  }

  const now = Date.now();
  data.dtAdded = now;
  data.dtUpdated = now;

  const queryPath = `userData/${userID}/data_v1/incoming`;
  logger.log('addPackage', queryPath, data);
  const fbRef = ref(db, queryPath);
  const newRef = await push(fbRef, data);
  return newRef.key;
}
