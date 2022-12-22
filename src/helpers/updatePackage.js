import { db } from '../helpers/fbHelper';
import { update, ref } from 'firebase/database';

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

  data.dtUpdated = Date.now();

  const userID = 'petele';
  const queryPath = `userData/${userID}/${kind}/${id}`;
  console.log('TODO: validate data');
  console.log('updatePackage', queryPath, data);

  const fbRef = ref(db, queryPath);
  return await update(fbRef, data);
}
