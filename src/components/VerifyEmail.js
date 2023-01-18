import * as React from 'react';

import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { getUser, verifyEmail } from '../helpers/fbHelper';

export default function VerifyEmail() {
  const [emailSent, setEmailSent] = React.useState(false);

  const user = getUser();
  if (user === null) {
    return null;
  }

  if (user.emailVerified) {
    return (
      <Box component="section" sx={{marginTop: 2}}>
        Your email address has been verified.
      </Box>
    );
  }

  function sendVerificationEmail() {
    verifyEmail();
    setEmailSent(true);
  }

  return (
    <Box component="section">
      <Typography component="section" variant="body2" sx={{my: 1}}>
        Help us to protect PackTrak and keep your account safe.
        Please confirm your email address.
      </Typography>

      <Stack direction="row" sx={{mt: 2}} spacing={2}>
        <Button type="button" variant="contained" disabled={emailSent} onClick={sendVerificationEmail}>
          Send Email Verification
        </Button>
        {emailSent && (
          <Alert severity="success">Verification email was sent.</Alert>
        )}
      </Stack>
    </Box>
  );

}
