import { db, getUserID } from './fbHelper';
import { onValue, orderByChild, query, ref, endAt, startAt } from 'firebase/database';
import { formatToISODate, getTodayEnd } from './dtHelpers';
import { logger } from './ConsoleLogger';

function _getQuery(userID, kind) {
  const queryPath = `userData/${userID}/data_v1/${kind}`;
  const fbRef = ref(db, queryPath);

  if (kind === 'incoming') {
    return fbRef;
  }

  const orderBy = orderByChild('dateDelivered');

  const eodToday = getTodayEnd();
  const startVal = eodToday - (30 * 24 * 60 * 60 * 1000);
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
 * @return FirebaseValue
 */
export default function getPackageList(kind, callback) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind) {
    return;
  }

  const fbQuery = _getQuery(userID, kind);
  logger.log('getPackageList', kind, userID);
  return onValue(fbQuery, (snapshot) => {
    if (callback) {
      callback(snapshot);
    }
  });
}
