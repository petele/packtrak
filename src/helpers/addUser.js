import { set, ref } from 'firebase/database';
import { signUp, db, verifyEmail } from '../helpers/fbHelper';

/**
 * Create and validate the info for a new user.
 *
 * @param {object} userInfo User info
 * @param {string} userInfo.email
 * @param {string} userInfo.password
 * @param {boolean} userInfo.agreeToS
 * @param {string} userInfo.fName
 * @param {string} userInfo.lName
 * @return {object} fbUser
 */
export default async function addUser(userInfo) {
  const email = userInfo.email;
  const password = userInfo.password;
  if (!userInfo.agreeToS) {
    const err = new Error('Must agree to the ToS');
    err.code = 'tos/must-agree';
    throw err;
  }

  const fbUser = await signUp(email, password);
  const fbUserID = fbUser.user.uid;

  const profilePath = `userData/${fbUserID}/profile`;
  const userProfile = {
    tosVersion: 0,
  };

  const fbRef = ref(db, profilePath);
  await set(fbRef, userProfile);

  verifyEmail();

  return fbUser.user;
}
