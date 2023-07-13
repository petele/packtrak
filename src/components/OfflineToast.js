import React, { Suspense } from 'react';

export default function OfflineToast({isOnline}) {
  if (isOnline) {
    return null;
  }

  const Snackbar = React.lazy(() => import('./Snackbar'));

  return (
    <Suspense>
      <Snackbar
        open
        message="Offline. Some functionality may not be available."
      />
    </Suspense>
  );
}
