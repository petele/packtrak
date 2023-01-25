import { get, ref } from 'firebase/database';
import { db, getUserID } from '../helpers/fbHelper';
import { logger } from './ConsoleLogger';

/**
 * Get a package from the database
 *
 * @param {string} kind incoming or delivered
 * @param {string} id Package ID
 * @return {Promise<Object>} Package details
 */
export default async function getPackage(kind, id) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  if (!kind || !id) {
    throw new Error(`Missing or invalid required param.`);
  }
  if (!['incoming', 'delivered'].includes(kind)) {
    throw new Error('not-found');
  }

  const queryPath = `userData/${userID}/data_v1/${kind}/${id}`;
  logger.log('getPackage', queryPath);

  try {
    const query = ref(db, queryPath);
    const snapshot = await get(query);
    if (!snapshot.exists()) {
      throw new Error('not-found');
    }
    const pkgObj = snapshot.val();
    return pkgObj;
  } catch (ex) {
    logger.error('getPackage failed.', queryPath, ex);
    throw ex;
  }
}
