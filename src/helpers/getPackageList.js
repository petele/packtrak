import { db, getUserID } from './fbHelper';
import { onValue, orderByChild, query, ref, endAt, startAt } from 'firebase/database';
import { formatToISODate, getTodayEnd } from './dtHelpers';
import { logger } from './ConsoleLogger';
import { gaTimingStart, gaTimingEnd } from './gaHelper';

function _getFromCache(kind) {
  const _perfName = 'cache_get_package_list';
  gaTimingStart(_perfName);
  const cached = localStorage.getItem(`cached_${kind}`);
  try {
    const asJSON = JSON.parse(cached);
    gaTimingEnd(_perfName);
    return asJSON;
  } catch (ex) {
    return null;
  }
}

function _saveToCache(kind, data) {
  try {
    const asStr = JSON.stringify(data);
    localStorage.setItem(`cached_${kind}`, asStr);
  } catch (ex) {
    return null;
  }
}

function _getQuery(userID, kind) {
  const queryPath = `userData/${userID}/data_v1/${kind}`;
  const fbRef = ref(db, queryPath);

  if (kind === 'incoming') {
    return fbRef;
  }

  const orderBy = orderByChild('dateDelivered');

  const eodToday = getTodayEnd();
  const daysBack = 30;
  const startVal = eodToday - (daysBack * 24 * 60 * 60 * 1000);
  const startDT = new Date(startVal);
  const startStr = formatToISODate(startDT);
  const start = startAt(startStr);

  const endVal = eodToday + 2000;
  const endDT = new Date(endVal);
  const endStr = formatToISODate(endDT);
  const end = endAt(endStr);

  return query(fbRef, orderBy, start, end);
}

/**
 * Gets data from Firebase.
 *
 * @param {string} kind
 * @param {Function} callback
 * @param {Function} errCallback
 * @return FirebaseValue
 */
export default function getPackageList(kind, callback, errCallback) {
  const _perfName = 'fb_get_package_list';
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind) {
    return;
  }

  const cached = _getFromCache(kind);
  if (cached) {
    if (callback) {
      callback(cached);
    }
  }

  gaTimingStart(_perfName);
  let isColdStart = true;
  const fbQuery = _getQuery(userID, kind);
  logger.log('getPackageList', kind, userID);
  return onValue(fbQuery, (snapshot) => {
    const packages = snapshot.val();
    if (isColdStart) {
      isColdStart = false;
      gaTimingEnd(_perfName);
    }
    if (callback) {
      callback(packages);
    }
    setTimeout(() => {
      _saveToCache(kind, packages);
    }, 500)
  }, (err) => {
    if (errCallback) {
      errCallback(err);
    }
  });
}
