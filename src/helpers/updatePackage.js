import { update, ref } from 'firebase/database';
import { db, getUserID } from '../helpers/fbHelper';
import { logger } from './ConsoleLogger';
import { gaTimingStart, gaTimingEnd } from './gaHelper';

import { validatePackage } from './validatePackageData';

/**
 * Checks to see if a value has been updated.
 *
 * @param {string} key Object key to check.
 * @param {object} pkgBefore Package data before edit
 * @param {object} pkgAfter Package data after edit.
 * @return {boolean} true if the field has been updated.
 */
function _hasValueChanged(key, pkgBefore, pkgAfter) {
  if (pkgBefore[key] === undefined && pkgAfter[key] === null) {
    return false;
  }
  if (pkgBefore[key] === pkgAfter[key]) {
    return false;
  }
  return true;
}

/**
 * Returns a new object with only the updated properties.
 *
 * @param {object} pkgBefore Package data before edit.
 * @param {object} pkgAfter Package data after edit.
 * @return {object} object with only the updated properties.
 */
function _getChanges(pkgBefore, pkgAfter) {
  const pkgChanges = {};
  if (_hasValueChanged('dateExpected', pkgBefore, pkgAfter)) {
    pkgChanges.dateExpected = pkgAfter.dateExpected;
  }
  if (_hasValueChanged('dateDelivered', pkgBefore, pkgAfter)) {
    pkgChanges.dateDelivered = pkgAfter.dateDelivered;
  }
  if (_hasValueChanged('from', pkgBefore, pkgAfter)) {
    pkgChanges.from = pkgAfter.from;
  }
  if (_hasValueChanged('what', pkgBefore, pkgAfter)) {
    pkgChanges.what = pkgAfter.what;
  }
  if (_hasValueChanged('shipper', pkgBefore, pkgAfter)) {
    pkgChanges.shipper = pkgAfter.shipper;
  }
  if (_hasValueChanged('trackingNumber', pkgBefore, pkgAfter)) {
    pkgChanges.trackingNumber = pkgAfter.trackingNumber;
  }
  if (_hasValueChanged('trackingURL', pkgBefore, pkgAfter)) {
    pkgChanges.trackingURL = pkgAfter.trackingURL;
  }
  if (_hasValueChanged('orderURL', pkgBefore, pkgAfter)) {
    pkgChanges.orderURL = pkgAfter.orderURL;
  }
  return pkgChanges;
}

/**
 * Updates the package record in the database.
 *
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @param {object} pkgBefore Pre-edit version of package data
 * @param {object} pkgAfter Post-edit version of package data
 * @return {Promise<null>} Successful update complete
 */
export default async function updatePackage(kind, id, pkgBefore, pkgAfter) {
  const _perfName = 'fb_update_package';
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind || !id || !pkgBefore || !pkgAfter) {
    throw new Error(`Missing or invalid required param.`);
  }

  gaTimingStart(_perfName);

  const changes = _getChanges(pkgBefore, pkgAfter);

  const keysChanged = Object.keys(changes);
  if (keysChanged.length === 0) {
    logger.log('updatePackage', 'Update skipped, nothing changed.');
    return;
  }

  const errors = validatePackage(changes, false);
  if (errors.length > 0) {
    logger.error('Validation failed.', changes, errors);
    throw new Error('Validation failed');
  }

  changes.dtUpdated = Date.now();

  const queryPath = `userData/${userID}/data_v1/${kind}/${id}`;
  logger.log('updatePackage', queryPath, changes);
  const fbRef = ref(db, queryPath);
  const r = await update(fbRef, changes);
  gaTimingEnd(_perfName);
  return r;
}
