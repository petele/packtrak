import { db } from './fbHelper';
import { onValue, ref } from 'firebase/database';

/**
 * Gets data from Firebase.
 *
 * @param {string} userID
 * @param {string} kind
 * @param {Function} callback
 * @return FirebaseValue
 */
export default function getPackageList(userID, kind, callback) {
  if (!userID || !kind) {
    return;
  }
  const queryPath = `userData/${userID}/data_v1/${kind}`;
  const query = ref(db, queryPath);
  return onValue(query, (snapshot) => {
    if (callback) {
      callback(snapshot);
    }
  });
}
