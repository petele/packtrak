import { db } from '../helpers/fbHelper';
import { set, get, ref, remove } from 'firebase/database';

/**
 * Marks the specified package as delivered.
 *
 * @param {string} userID User ID
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @param {boolean} delivered Has the package been delivered.
 * @return {boolean} Successful update complete
 */
export default async function markAsDelivered(userID, kind, id, delivered) {

  console.log('markAsDelivered', userID, kind, id, delivered);

  const fromQueryPath = `userData/${userID}/${kind}/${id}`;
  const fromRef = ref(db, fromQueryPath);
  const fromSnap = await get(fromRef);

  const val = fromSnap.val();
  val.delivered = delivered;
  val.dtUpdated = Date.now();

  // Set the new version
  const toKind = kind === 'incoming' ? 'delivered' : 'incoming';
  const toQueryPath = `userData/${userID}/${toKind}/${id}`;
  const toRef = ref(db, toQueryPath);
  await set(toRef, val);

  // Delete the old version
  await remove(fromRef);

  return Promise.resolve();
}
