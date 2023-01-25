import { set, get, ref, remove } from 'firebase/database';
import { db, getUserID } from '../helpers/fbHelper';
import { formatToISODate } from './dtHelpers';

/**
 * Marks the specified package as delivered.
 *
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @param {boolean} delivered Has the package been delivered.
 * @return {boolean} Successful update complete
 */
export default async function markAsDelivered(kind, id, delivered) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind || !id) {
    throw new Error(`Missing or invalid required param.`);
  }

  const fromQueryPath = `userData/${userID}/data_v1/${kind}/${id}`;
  const fromRef = ref(db, fromQueryPath);
  const fromSnap = await get(fromRef);

  const val = fromSnap.val();
  val.delivered = delivered;
  val.dtUpdated = Date.now();
  val.dateDelivered = delivered ? formatToISODate(new Date()) : null;

  // Set the new version
  const toKind = kind === 'incoming' ? 'delivered' : 'incoming';
  const toQueryPath = `userData/${userID}/data_v1/${toKind}/${id}`;
  const toRef = ref(db, toQueryPath);
  await set(toRef, val);

  // Delete the old version
  await remove(fromRef);

  return true;
}
