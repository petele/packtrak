import { update, ref } from 'firebase/database';
import { db, getUserID } from '../helpers/fbHelper';
import { logger } from './ConsoleLogger';
import { gaEvent } from './gaHelper';

import { cleanPackageObject, validatePackage } from './validatePackageData';

/**
 * Updates the package record in the database.
 *
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @param {object} data Package details
 * @param {?string} data.dateExpected Date expected (YYYY-MM-DD)
 * @param {?string} data.from Who the package is from
 * @param {?string} data.what What's in the package
 * @param {?string} data.shipper Who the shipper is
 * @param {?string} data.orderURL URL to order
 * @param {?string} data.trackingNumber Tracking number from shipper
 * @param {?string} data.trackingURL Tracking URL from shipper
 * @param {?object} before - Same as data, but pre-edit version
 * @return {Promise<null>} Successful update complete
 */
export default async function updatePackage(kind, id, data, before) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind || !id || !data) {
    throw new Error(`Missing or invalid required param.`);
  }

  const pkg = cleanPackageObject(data);
  const {valid, errors} = validatePackage(pkg);

  if (!valid) {
    logger.error('Validation failed', pkg, errors);
    throw new Error('Validation failed');
  }

  pkg.dtUpdated = Date.now();

  const queryPath = `userData/${userID}/data_v1/${kind}/${id}`;

  gaEvent('package', 'update');
  logger.log('updatePackage', queryPath, pkg);

  const fbRef = ref(db, queryPath);
  return await update(fbRef, pkg);
}
