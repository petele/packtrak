import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Link,
} from '@mui/material';
import { logger } from '../helpers/ConsoleLogger';

export default function CookieBanner() {
  const lsKey = 'pt_cookie_agree';
  const [bannerVisible, setBannerVisible] = React.useState(false);

  React.useEffect(() => {
    const hasAccepted = !!window.localStorage.getItem(lsKey);
    logger.log('cookieBanner', hasAccepted);
    if (!hasAccepted) {
      setBannerVisible(true);
    }
  }, []);

  function clickOK() {
    window.localStorage.setItem(lsKey, 'true');
    setBannerVisible(false);
  }

  return (
    <Box sx={{position:'absolute', bottom: 0, width: '100%'}}>
      {bannerVisible && (
        <Alert severity="info" action={<Button onClick={clickOK} color="inherit" size="small">
        Dismiss
      </Button>}>
          <AlertTitle>Cookies</AlertTitle>
          This site uses cookies for authentication and analytics.
          &nbsp;
          <Link component={RouterLink} color="inherit" to="/about">Learn more</Link>
        </Alert>
      )}
    </Box>
  );
}
