
/**
 * Parses a date string and returns it as a DateTime object.
 *
 * @param {string} value Date value, eg 2025-05-21
 * @returns DateTime object for the specified date.
 */
export function parseDateFromString(value) {
  const dtSplit = value.split('-');
  const result = new Date();
  result.setFullYear(parseInt(dtSplit[0]));
  result.setMonth(parseInt(dtSplit[1]) - 1);
  result.setDate(parseInt(dtSplit[2]));
  return result;
}

/**
 * Returns the number of milliseconds since the epoch for 12:00am today
 *
 * @returns {number}
 */
export function getTodayStart() {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(1);
  return today.valueOf();
}

/**
 * Returns the number of milliseconds since the epoch for 11:59pm today
 *
 * @returns {number}
 */
export function getTodayEnd() {
  const today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  today.setMilliseconds(1);
  return today.valueOf();
}

/**
 * Formats a DateTime object to a long string.
 *
 * @param {DateTime} dtValue DateTime object to format
 * @returns {string} Monday, May 24th, 2023
 */
export function formatToLongString(dtValue) {
  try {
    const opts = {dateStyle: 'full'};
    const dtFormatter = new Intl.DateTimeFormat('lookup', opts);
    return dtFormatter.format(dtValue);
  } catch (ex) {
    console.log('Error parsing DT value', dtValue, ex);
    return 'Unknown';
  }
}

/**
 * Formats a DateTime object to a long string.
 *
 * @param {DateTime} dtValue DateTime object to format
 * @returns {string} Mon, Jan 24, 2023
 */
export function formatToShortString(dtValue) {
  try {
    const opts = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const dtFormatter = new Intl.DateTimeFormat('lookup', opts);
    return dtFormatter.format(dtValue);
  } catch (ex) {
    console.log('Error parsing DT value', dtValue, ex);
    return 'Unknown';
  }
}

/**
 * Returns a DateTime object formatted as a string.
 *
 * @param {DateTime} dtValue DateTime object to format
 * @param {boolean} short Return short version
 * @return {string}
 */
export function formatToString(dtValue, short) {
  if (short) {
    return formatToShortString(dtValue);
  }
  return formatToLongString(dtValue);
}

/**
 * Formats a DateTime object to YYYY-MM-DD
 *
 * @param {DateTime} dtValue DateTime object to format
 * @returns {string} YYYY-MM-DD
 */
export function formatToISODate(dtValue) {
  const opts = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const dtFormat = new Intl.DateTimeFormat('en-us', opts);
  const parts = dtFormat.formatToParts(dtValue);
  const year = parts[4].value;
  const mo = parts[0].value;
  const da = parts[2].value;
  return `${year}-${mo}-${da}`;
}
