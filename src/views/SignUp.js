import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Copyright from '../components/Copyright';
import SignInStatusAlert from '../components/SignInStatusAlert';
import TOSLabel from '../components/TOSLabel';

import addUser from '../helpers/addUser';
import { logger } from '../helpers/ConsoleLogger';

export default function SignUp({uid}) {
  document.title = `Sign Up - PackTrak`;

  const [signUpFailed, setSignUpFailed] = React.useState(false);

  const navigate = useNavigate();

  function getFailedMessage(reason) {
    if (reason === 'tos-disagree') {
      return 'You must check the "I understand" checkbox to use this site.';
    } else if (reason === 'auth/invalid-email.') {
      return 'Please use a valid email address.';
    } else if (reason === 'auth/weak-password') {
      return 'Please use a stronger password.';
    } else if (reason === 'auth/email-already-in-use') {
      return 'An error occured creating your account.'
    }

    return 'Sorry, an error occured creating your account.';
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email'),
      password: data.get('password'),
      fName: data.get('firstName'),
      lName: data.get('lastName'),
      agreeToS: !!data.get('agreeToS')
    };
    window.gtag('event', 'sign_up', {method: 'email'});

    addUser(userInfo).then((result) => {
      if (result.success) {
        navigate('/incoming', {replace: true});
        return;
      }
      logger.error('Sign up failed', result);
      setSignUpFailed(getFailedMessage(result.reason));
    })
  };

  return (
    <Container component="main" maxWidth="xs" sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <SignInStatusAlert uid={uid} />
          <Stack direction="row" justifyContent="space-between">
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              sx={{marginRight: 1}}
            />
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              sx={{marginLeft: 1}}
            />
          </Stack>
          <TextField
            required
            fullWidth
            id="email"
            type="email"
            inputMode="email"
            label="Email Address"
            name="email"
            autoComplete="username email"
          />
          <TextField
            required
            fullWidth
            minLength="6"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <FormControlLabel
            control={<Checkbox name="agreeToS" value="agreeToS" color="primary" />}
            label={<TOSLabel />}
          />
          {signUpFailed && (
            <Alert severity="error">
              {signUpFailed}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Link component={RouterLink} to="/forgot" variant="body2">
              Forgot password?
            </Link>
            <Link component={RouterLink} to="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
