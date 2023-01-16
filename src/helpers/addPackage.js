import { db } from './fbHelper';
import { push, ref } from 'firebase/database';
import { gaEvent } from './gaHelper';

// import validatePackageData from './validatePackageData';
import { cleanPackageObject, validatePackage } from './validatePackageData';

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

  const pkg = cleanPackageObject(data);
  const {valid, errors} = validatePackage(pkg);

  if (!valid) {
    console.error('Validation failed', pkg, errors);
    throw new Error('Validation failed');
  }

  const now = Date.now();
  pkg.dtAdded = now;
  pkg.dtUpdated = now;

  const queryPath = `userData/${userID}/data_v1/incoming`;

  gaEvent('package', 'add');
  console.log('addPackage', queryPath, pkg);

  const fbRef = ref(db, queryPath);
  const newRef = await push(fbRef, pkg);
  return newRef.key;
}
