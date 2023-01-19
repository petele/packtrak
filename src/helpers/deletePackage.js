import { set, get, ref, remove } from 'firebase/database';
import { db, getUserID } from '../helpers/fbHelper';
import { gaEvent } from './gaHelper';

const _keepBackup = false;

/**
 * Deletes the specified package.
 *
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @return {boolean} Successful update complete
 */
export default async function deletePackage(kind, id) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind || !id) {
    throw new Error(`Missing or invalid required param.`);
  }
  gaEvent('package', 'delete');

  const fromQueryPath = `userData/${userID}/data_v1/${kind}/${id}`;

  try {
    const fromRef = ref(db, fromQueryPath);
    const fromSnap = await get(fromRef);

    if (_keepBackup) {
      const val = fromSnap.val();
      val.deleted = true;
      val.dtDeleted = Date.now();

      // Move version to deleted
      const toQueryPath = `userData/${userID}/data_v1/deleted/${id}`;
      const toRef = ref(db, toQueryPath);
      await set(toRef, val);
    }

    // Delete the old version
    await remove(fromRef);
    return true;
  } catch (ex) {
    console.error('Unable to delete package', fromQueryPath, ex);
    throw ex;
  }
}
