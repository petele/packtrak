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
  console.log('TODO: handle input checking');
  const queryPath = `userData/${userID}/${kind}/${id}`;
  const query = ref(db, queryPath);
  const snapshot = await get(query);
  if (!snapshot.exists()) {
    console.log('TODO: Handle no data');
    throw new Error('not-found');
  }
  const pkgObj = snapshot.val();
  return pkgObj;
}
