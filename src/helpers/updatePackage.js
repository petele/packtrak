import { update, ref } from 'firebase/database';
import { db } from '../helpers/fbHelper';
import { gaEvent } from './gaHelper';

/**
 * Updates the package record in the database.
 *
 * @param {string} userID User ID
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
export default async function updatePackage(userID, kind, id, data, before) {
  if (!userID || !kind || !id || !data) {
    throw new Error(`Missing or invalid required param.`);
  }
  gaEvent('package', 'update');

  data.dtUpdated = Date.now();

  const queryPath = `userData/${userID}/${kind}/${id}`;
  console.log('TODO: validate data');
  console.log('updatePackage', queryPath, data);

  const fbRef = ref(db, queryPath);
  return await update(fbRef, data);
}
