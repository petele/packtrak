import { logger } from './ConsoleLogger';
import { getTodayStart, getTodayEnd, parseDateFromString } from './dtHelpers';

function sortByExpected(pkgA, pkgB) {
  return Date.parse(pkgA.dateExpected) - Date.parse(pkgB.dateExpected);
}

function sortByDelivered(pkgA, pkgB) {
  return Date.parse(pkgA.dateDelivered) - Date.parse(pkgB.dateDelivered);
}

/**
 *
 * @param {object} pkgList Raw package list from server
 * @param {string} kind Incoming or Delivered
 * @returns
 */
export default function parsePackageList(pkgList, kind) {
  if (!['incoming', 'delivered'].includes(kind)) {
    logger.warn('parsePackageList: invalid kind:', kind);
    kind = 'incoming';
  }
  if (!pkgList) {
    return [];
  }
  if (typeof pkgList !== 'object') {
    return [];
  }

  const todayStart = getTodayStart();
  const todayEnd = getTodayEnd();

  const result = Object.keys(pkgList).map((key) => {
    const pkg = pkgList[key];
    pkg.id = key;
    if (kind === 'incoming') {
      const status = _deliveryStatus(pkg.delivered, pkg.dateExpected, todayStart, todayEnd);
      pkg.isOverdue = status.isOverdue;
      pkg.isDueToday = status.isDueToday;
    }
    if (kind === 'delivered' && !pkg.dateDelivered) {
      pkg.dateDelivered = pkg.dateExpected;
    }
    return pkg;
  });

  result.sort(kind === 'incoming' ? sortByExpected : sortByDelivered);
  if (kind === 'delivered') {
    result.reverse();
  }

  return result;
}

/**
 * Checks if a package is due today, overdue, etc.
 *
 * @param {boolean} delivered Has the package been delivered
 * @param {string} dateExpected Date expected YYYY-MM-DD
 * @param {number} todayStart Date/time value at start of today
 * @param {number} todayEnd Date/time value at end of today
 * @returns {object}
 */
function _deliveryStatus(delivered, dateExpected, todayStart, todayEnd) {
  const result = {
    isOverdue: false,
    isDueToday: false,
  };
  if (delivered) {
    return result;
  }
  const dtExpected = parseDateFromString(dateExpected);
  const expectedVal = dtExpected.valueOf();
  result.isOverdue = expectedVal < todayStart;
  result.isDueToday = todayStart < expectedVal &&
                      expectedVal < todayEnd;
  return result;
}
