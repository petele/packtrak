/**
 * Marks the specified package as delivered.
 *
 * @param {string} id Package ID
 * @param {boolean} delivered Has the package been delivered.
 * @return {boolean} Successful update complete
 */
export default function markAsDelivered(id, delivered) {

  console.log('markAsDelivered', id, delivered);
  return true;
}
