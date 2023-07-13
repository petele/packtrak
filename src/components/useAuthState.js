import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../helpers/fbHelper';
import { gaSetUserID } from '../helpers/gaHelper';

export function useAuthState() {
  const [uid, setUID] = useState(-1);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
        gaSetUserID(user.uid);
      } else {
        setUID(null);
        gaSetUserID('signed_out');
      }
    });
  }, []);
  return uid;
}
