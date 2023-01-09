import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <Container component="main" maxWidth="xs" sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            inputMode="email"
            label="Email Address"
            name="email"
            autoComplete="username"
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
          <Stack direction="row" sx={{ mt: 2 }} justifyContent="space-between">
            <Link href="/forgot" variant="body2">
              Forgot password?
            </Link>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
