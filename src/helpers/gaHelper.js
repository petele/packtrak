import { logger } from "./ConsoleLogger";

/**
 * Logs an event to Google Analytics.
 * @param {string} category - The object that was interacted with.
 * @param {string} action - The type of interaction.
 * @param {string} [label] - Useful for categorizing events.
 * @param {number} [value] - A numeric value associated with the event.
 * @param {boolean} [nonInteraction=false] - Indicates a non-interaction event.
 */
export function gaEvent(category, action, label, value, nonInteraction) {
  logger.log('🔔', category, action, label, value);
  if (window.location.hostname === 'localhost') {
    return;
  }
  const details = {action};
  if (label) {
    details.label = label;
  }
  if (value) {
    details.value = value;
  }
  if (nonInteraction) {
    details.nonInteraction = true;
  }

  window.gtag('event', category, details);
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
