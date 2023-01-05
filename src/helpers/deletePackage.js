import { set, get, ref, remove } from 'firebase/database';
import { db } from '../helpers/fbHelper';

/**
 * Deletes the specified package.
 *
 * @param {string} userID User ID
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @return {boolean} Successful update complete
 */
export default async function deletePackage(userID, kind, id) {
  if (!userID || !kind || !id) {
    throw new Error(`Missing or invalid required param.`);
  }

  const fromQueryPath = `userData/${userID}/${kind}/${id}`;

  try {
    const fromRef = ref(db, fromQueryPath);
    const fromSnap = await get(fromRef);

    const val = fromSnap.val();
    val.deleted = true;
    val.dtDeleted = Date.now();

    // Move version to deleted
    const toQueryPath = `userData/${userID}/deleted/${id}`;
    const toRef = ref(db, toQueryPath);
    await set(toRef, val);

    // Delete the old version
    await remove(fromRef);
    return true;
  } catch (ex) {
    console.error('Unable to delete package', fromQueryPath, ex);
    throw ex;
  }
}
