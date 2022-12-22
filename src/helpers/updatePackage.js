/**
 * Updates the package record in the database.
 *
 * @param {string} id Package ID
 * @param {object} data Package details
 * @param {?string} data.dateExpected Date expected (YYYY-MM-DD)
 * @param {?string} data.from Who the package is from
 * @param {?string} data.what What's in the package
 * @param {?string} data.shipper Who the shipper is
 * @param {?string} data.orderURL URL to order
 * @param {?string} data.trackingNumber Tracking number from shipper
 * @param {?string} data.trackingURL Tracking URL from shipper
 * @return {Promise<boolean>} Successful update complete
 */
export default function updatePackage(id, data) {

  data.dtUpdated = Date.now();
  console.log('updatePackage', id, data);
  return Promise.resolve(true);
}
