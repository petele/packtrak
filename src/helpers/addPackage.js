import { db, getUserID } from './fbHelper';
import { push, ref } from 'firebase/database';
import { gaEvent } from './gaHelper';

// import validatePackageData from './validatePackageData';
import { cleanPackageObject, validatePackage } from './validatePackageData';
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

  const pkg = cleanPackageObject(data);
  const {valid, errors} = validatePackage(pkg);

  if (!valid) {
    logger.error('Validation failed.', pkg, errors);
    throw new Error('Validation failed');
  }

  const now = Date.now();
  pkg.dtAdded = now;
  pkg.dtUpdated = now;

  const queryPath = `userData/${userID}/data_v1/incoming`;

  gaEvent('package', 'add');
  logger.log('addPackage', queryPath, pkg);

  const fbRef = ref(db, queryPath);
  const newRef = await push(fbRef, pkg);
  return newRef.key;
}
