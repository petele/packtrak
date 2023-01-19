import {
  Alert,
  Button
} from '@mui/material';

import { signOut } from '../helpers/fbHelper';

export default function SignInStatusAlert({uid}) {
  if (uid === null || uid === -1) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      action={<Button color="inherit" size="small" onClick={signOut}>Sign Out</Button>}
    >
      You are already signed in.
    </Alert>
  );

}
