import { parseDateFromString } from './dtHelpers';

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

export function addDeliveryStatus(pkg, todayStart, todayEnd) {
  const delivered = pkg.delivered;
  const dateExpected = pkg.dateExpected;
  const status = _deliveryStatus(delivered, dateExpected, todayStart, todayEnd);
  pkg.isOverdue = status.isOverdue;
  pkg.isDueToday = status.isDueToday;
  return pkg;
}
