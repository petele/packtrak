import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import Copyright from '../components/Copyright';

import { resetPassword } from '../helpers/fbHelper';

export default function Forgot() {
  document.title = `Forgot Password - PackTrak`;

  const [email, setEmail] = React.useState('');
  const [resetDone, setResetDone] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword(email);
    setEmail('');
    setResetDone(true);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setEmail(value);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        Forgot password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            type="email"
            inputMode="email"
            label="Email Address"
            name="email"
            autoComplete="username email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          {resetDone && (
            <Alert severity="success">Password reset email sent.</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Link component={RouterLink} to="/signin" variant="body2">
              Sign In
            </Link>
            <Link component={RouterLink} to="/signup" variant="body2">
              Sign Up
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
