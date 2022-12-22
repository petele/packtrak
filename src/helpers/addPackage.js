/**
 * Add a package to the database
 *
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
export default function addPackage(data) {

  // TODO: Validate input
  const now = Date.now();
  data.arrived = false;
  data.dtAdded = now;
  data.dtUpdated = now;
  console.log('addPackage', data);
  return Promise.resolve('pack12345');
}
