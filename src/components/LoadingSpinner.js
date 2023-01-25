import * as React from 'react';

import {
  Box,
  Link,
  CircularProgress
} from '@mui/material';
import { gaEvent } from '../helpers/gaHelper';

export default function LoadingSpinner() {
  const [offerReload, setOfferReload] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const url = window.location.pathname;
      gaEvent('long_load', {path: url});
      setOfferReload(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function clickReload() {
    window.location.reload();
  }

  const pointerStyle = {
    cursor: 'pointer !important',
  };

  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CircularProgress />
      {offerReload && (
        <Box sx={{mt: 4}}>
          Sorry, this it taking longer than usual, want
          to <Link onClick={clickReload} to="#" sx={pointerStyle}>reload</Link>?
        </Box>
      )}
    </Box>
  );
}
