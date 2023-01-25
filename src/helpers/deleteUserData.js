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

  await signIn(email, password);

  const fromQueryPath = `userData/${userID}`;
  const fromRef = ref(db, fromQueryPath);
  await remove(fromRef);

  const user = getUser();
  await deleteUser(user);
}
