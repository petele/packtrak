import { useState, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../helpers/fbHelper';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const connectedRef = ref(db, '.info/connected');
    return onValue(connectedRef, (snap) => {
      const connected = snap.val();
      setIsOnline(connected);
    });
  }, []);
  return isOnline;
}
