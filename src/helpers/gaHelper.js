import { logger } from "./ConsoleLogger";

const _timingValues = {};

/**
 * Sets the user ID for analytics.
 * @param {string} userID User ID
 */
export function gaSetUserID(userID) {
  logger.log('👤', userID);
  if (window.location.hostname === 'localhost' || !window.packtrackGTAGid) {
    return;
  }
  window.gtag('config', window.packtrackGTAGid, {user_id: userID});
}

/**
 * Logs an event to Google Analytics.
 * @param {string} category - The object that was interacted with.
 * @param {object} opts - Analytics options.
*/
export function gaEvent(category, opts) {
  logger.log('🔔', category, opts);
  if (window.location.hostname === 'localhost') {
    return;
  }
  window.gtag('event', category, opts);
}

/**
 * Logs an exception/error to Google Analytics.
 *
 * @param {string} description Description of the error.
 * @param {boolean} wasFatal Was the error fatal.
 * @param {Error} [ex] Exception
 */
export function gaError(description, wasFatal, ex) {
  const fatal = !!wasFatal;
  logger.error('⛔️', description, fatal, ex);
  if (window.location.hostname === 'localhost') {
    return;
  }
  window.gtag('event', 'exception', {description, fatal});
}

/**
 * Logs an timing event to Google Analytics.
 * @param {string} category - Category of timer.
 * @param {string} variable - The variable being timed.
 * @param {integer} value - A numeric value associated with the event.
 * @param {string} [label] - Useful for categorizing events.
 */
export function gaTiming({name, delta, value, id}) {
  const details = {
    value: delta,
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
  }
  logger.log('⏱️', name, value);
  if (window.location.hostname === 'localhost') {
    return;
  }
  window.gtag('event', name, details);
}

/**
 * Marks the start time for a performance timer.
 *
 * @param {string} name
 */
export function gaTimingStart(name) {
  _timingValues[name] = performance.now();
}

/**
 * Marks the end for a performance timer and logs the duration.
 *
 * @param {string} name name of performance timer
 * @return
 */
export function gaTimingEnd(name) {
  const start = _timingValues[name];
  if (!start) {
    logger.warn(`gaTimingEnd - could not find start time for '${name}'.`);
    return;
  }
  const dur = performance.now() - start;
  setTimeout(() => {
    gaTiming({name: name, value: dur});
    delete _timingValues[name];
  }, 0);
}
