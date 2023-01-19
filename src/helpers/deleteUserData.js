import { ref, remove } from 'firebase/database';
import { deleteUser } from 'firebase/auth';
import { db, getUser, getUserEmail, getUserID, signIn } from './fbHelper';

export async function deleteUserData(password) {
  const userID = getUserID();
  if (!userID) {
    throw new Error('Not Authenticated');
  }
  const email = getUserEmail();
  if (!email) {
    throw new Error('Unable to determine user email');
  }

  try {
    await signIn(email, password);
  } catch (ex) {
    throw ex;
  }

  try {
    const fromQueryPath = `userData/${userID}`;
    const fromRef = ref(db, fromQueryPath);
    await remove(fromRef);
  } catch (ex) {
    throw ex;
  }

  try {
    const user = getUser();
    await deleteUser(user);
  } catch (ex) {
    throw ex;
  }
}
