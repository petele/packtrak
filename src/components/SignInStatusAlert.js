import {
  Alert,
  Button
} from '@mui/material';

import { signOut } from '../helpers/fbHelper';
import { gaEvent } from '../helpers/gaHelper';

export default function SignInStatusAlert({uid}) {
  if (uid === null || uid === -1) {
    return null;
  }

  function handleSignOut() {
    gaEvent('sign_out', {from: 'signin_alert'});
    signOut();
  }

  return (
    <Alert
      severity="warning"
      action={<Button color="inherit" size="small" onClick={handleSignOut}>Sign Out</Button>}
    >
      You are already signed in.
    </Alert>
  );

}
