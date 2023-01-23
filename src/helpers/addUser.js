import { set, ref } from 'firebase/database';
import { signUp, db, verifyEmail } from '../helpers/fbHelper';
import { logger } from './ConsoleLogger';

/**
 * Create and validate the info for a new user.
 *
 * @param {object} userInfo User info
 * @param {string} userInfo.email
 * @param {string} userInfo.password
 * @param {boolean} userInfo.agreeToS
 * @param {string} userInfo.fName
 * @param {string} userInfo.lName
 * @return {object} result
 * @return {boolean} result.success
 * @return {object} result.fbUser
 * @return {string} result.reason
 */
export default async function addUser(userInfo) {

  const email = userInfo.email;
  const password = userInfo.password;
  if (!userInfo.agreeToS) {
    return {success: false, reason: 'tos-disagree'};
  }

  try {
    const fbUser = await signUp(email, password);
    const fbUserID = fbUser.user.uid;

    const profilePath = `userData/${fbUserID}/profile`;
    const now = Date.now();
    const userProfile = {
      name: {
        first: userInfo.fName,
        last: userInfo.lName,
      },
      accountCreatedOn: now,
      tosVersion: 0,
      lastLogin: now,
    };

    const fbRef = ref(db, profilePath);
    await set(fbRef, userProfile);

    await verifyEmail();

    return {success: true, fbUser: fbUser.user};
  } catch (ex) {
    logger.error('addUser failed.', ex);
    return {success: false, reason: ex.code};
  }
}
