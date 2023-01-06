import * as React from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Grid,
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
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
            <Grid container>
              <Grid item xs>
                <Link href="/signin" variant="body2">
                  Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
