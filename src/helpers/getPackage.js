import { get, ref } from 'firebase/database';
import { db } from '../helpers/fbHelper';

/**
 * Get a package from the database
 *
 * @param {string} userID User ID
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @return {Promise<Object>} Package details
 */
export default async function getPackage(userID, kind, id) {
  if (!userID || !kind || !id) {
    return Promise.reject(new Error(`Missing or invalid required param.`));
  }

  const queryPath = `userData/${userID}/${kind}/${id}`;

  try {
    const query = ref(db, queryPath);
    const snapshot = await get(query);
    if (!snapshot.exists()) {
      throw new Error('not-found');
    }
    const pkgObj = snapshot.val();
    return pkgObj;
  } catch (ex) {
    console.error('Unable to get package', queryPath, ex);
    throw ex;
  }
}
