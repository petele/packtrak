import * as React from 'react';

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import { changePassword, getUserEmail } from '../helpers/fbHelper';

export default function ChangePassword() {
  const userEmail = getUserEmail() || '';
  const [currentPW, setCurrentPW] = React.useState('');
  const [newPW1, setNewPW1] = React.useState('');
  const [newPW2, setNewPW2] = React.useState('');
  const [pwMisMatch, setPWMisMatch] = React.useState(false);
  const [pwChanged, setPWChanged] = React.useState(false);
  const [pwChangeFailed, setPWChangeFailed] = React.useState(null);

  function resetErrors() {
    setPWChanged(false);
    setPWMisMatch(false);
    setPWChangeFailed(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetErrors();

    if (newPW1 !== newPW2) {
      setCurrentPW('');
      setNewPW1('');
      setNewPW2('');
      setPWMisMatch(true);
      return;
    }

    try {
      await changePassword(currentPW, newPW1);
      setCurrentPW('');
      setNewPW1('');
      setNewPW2('');
      setPWChanged(true);
    } catch (ex) {
      setPWChangeFailed(true);
      console.log('password change failed', ex);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'current-password') {
      setCurrentPW(value);
    } else if (name === 'password-new1') {
      setNewPW1(value);
    } else if (name === 'password-new2') {
      setNewPW2(value);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <input
          type="hidden"
          name="email"
          id="change-pw-email"
          autoComplete="username email"
          value={userEmail}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="current-password"
          label="Current Password"
          type="password"
          autoComplete="current-password"
          value={currentPW}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password-new1"
          label="New Password"
          type="password"
          autoComplete="new-password"
          value={newPW1}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password-new2"
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          value={newPW2}
          onChange={handleChange}
        />
        {pwMisMatch && (
          <Alert severity="error">New passwords must match.</Alert>
        )}
        {pwChangeFailed && (
          <Alert severity="error">Unable to change your password.</Alert>
        )}
        {pwChanged && (
          <Alert severity="success">Your password was changed.</Alert>
        )}
        <Stack direction="row" sx={{ mt: 2 }} justifyContent="flex-start" spacing={2}>
          <Button
            type="submit"
            variant="contained"
          >
            Change Password
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
