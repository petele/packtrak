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

import { signIn } from '../helpers/fbHelper';

export default function SignIn() {
  document.title = `Sign In - PackTrak`;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInFailed, setSignInFailed] = React.useState(false);

  const navigate = useNavigate();

  const showRememberMe = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    // const rememberMe = !!data.get('remember');
    // console.log('rememberMe', rememberMe);

    window.gtag('event', 'login', {method: 'email'});

    signIn(email, password)
        .then((fbUser) => {
          window.localStorage.setItem('pktk_uid', fbUser.user.uid);
          console.log('sign in success', fbUser.user);
          navigate('/incoming');
        })
        .catch((ex) => {
          setSignInFailed(true);
          setEmail('');
          setPassword('');
          console.log('sign in failed', ex);
        });
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              inputMode="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />
            {showRememberMe && (
              <FormControlLabel
                control={<Checkbox name="remember" value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            {signInFailed && (
              <Alert severity="error">Sorry, sign in failed.</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
