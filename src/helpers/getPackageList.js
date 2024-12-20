import { db, getUserID } from './fbHelper';
import { onValue, orderByChild, query, ref, endAt, startAt } from 'firebase/database';
import { formatToISODate, getTodayStart, getTodayEnd } from './dtHelpers';
import { logger } from './ConsoleLogger';
import { gaTimingStart, gaTimingEnd } from './gaHelper';
import { addDeliveryStatus } from './parsePackageList';

const _USE_CACHE = false;

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

function _getQuery(userID, kind, daysBack=30) {
  const queryPath = `userData/${userID}/data_v1/${kind}`;
  const fbRef = ref(db, queryPath);

  const orderByKind = kind === 'incoming' ? 'dateExpected' : 'dateDelivered';
  const orderBy = orderByChild(orderByKind);

  if (kind === 'incoming') {
    return query(fbRef, orderBy);
  }

  const eodToday = getTodayEnd();
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
 * @param {Number} daysBack - used only for delivered packages
 * @param {Function} callback
 * @param {Function} errCallback
 * @return FirebaseValue
 */
export default function getPackageList(kind, daysBack, callback, errCallback) {
  const _perfName = 'fb_get_package_list';
  const userID = getUserID();
  if (!userID) {
    errCallback('not_authenticated');
    return () => {};
  }
  if (!kind || !['incoming', 'delivered'].includes(kind)) {
    errCallback('invalid_kind');
    return () => {};
  }

  if (_USE_CACHE) {
    const cached = _getFromCache(kind);
    if (cached) {
      callback(cached);
    }
  }

  gaTimingStart(_perfName);
  let isColdStart = true;
  const fbQuery = _getQuery(userID, kind, daysBack);
  logger.log('getPackageList', kind, daysBack, userID);
  return onValue(fbQuery, (snapshot) => {
    const result = [];
    if (!snapshot.exists()) {
      callback(result);
      return;
    }

    const todayStart = getTodayStart();
    const todayEnd = getTodayEnd();
    snapshot.forEach((pkgSnap) => {
      const pkg = pkgSnap.val();
      pkg.id = pkgSnap.key;
      if (kind === 'incoming') {
        addDeliveryStatus(pkg, todayStart, todayEnd);
      }
      result.push(pkg);
    });

    if (kind === 'delivered') {
      result.reverse();
    }

    if (isColdStart) {
      isColdStart = false;
      gaTimingEnd(_perfName);
    }

    callback(result);
    setTimeout(() => {
      _saveToCache(kind, result);
    }, 500);
  }, (err) => {
    errCallback(err);
  });
}
