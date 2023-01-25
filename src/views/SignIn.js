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

import { signIn } from '../helpers/fbHelper';
import { gaError, gaEvent } from '../helpers/gaHelper';

export default function SignIn({uid}) {
  document.title = `Sign In - PackTrak`;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(true);
  const [signInFailed, setSignInFailed] = React.useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await signIn(email, password, rememberMe);
      gaEvent('login', {method: 'email'});
      navigate('/incoming', {replace: true});
    } catch (ex) {
      gaError('login_failed', false, ex);
      setSignInFailed(true);
      setEmail('');
      setPassword('');
    }
  }

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'remember') {
      setRememberMe(target.checked);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <SignInStatusAlert uid={uid} />
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
          <FormControlLabel
            control={<Checkbox name="remember" checked={rememberMe} onChange={handleChange} color="primary" />}
            label="Remember me"
          />
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
            <Link component={RouterLink} to="/forgot" variant="body2">
              Forgot password?
            </Link>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
