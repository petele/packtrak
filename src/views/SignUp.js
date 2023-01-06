import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import Copyright from '../components/Copyright';
import TOSLabel from '../components/TOSLabel';

import addUser from '../helpers/addUser';

export default function SignUp(props) {
  document.title = `Sign Up - PackTrak`;

  const [signUpFailed, setSignUpFailed] = React.useState(false);

  const navigate = useNavigate();

  function getFailedMessage(reason) {
    console.log('reason', reason);
    if (reason === 'tos-disagree') {
      return 'You must agree to the terms of service.';
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
        navigate('/incoming');
        return;
      }
      setSignUpFailed(getFailedMessage(result.reason));
    })
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  inputMode="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="agreeToS" value="agreeToS" color="primary" />}
                  label={<TOSLabel />}
                />
              </Grid>
            </Grid>
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
            <Grid container>
            <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
