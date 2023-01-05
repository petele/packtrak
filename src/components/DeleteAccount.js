import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  TextField,
} from '@mui/material';

import { getUserEmail } from '../helpers/fbHelper';
import { deleteUserData } from '../helpers/deleteUserData';

export default function DeleteAccount(props) {
  const navigate = useNavigate();
  const userEmail = getUserEmail() || '';
  const [currentPW, setCurrentPW] = React.useState('');
  const [cantDelete, setCantDelete] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCantDelete(null);

    try {
      await deleteUserData(currentPW);
      navigate('/');
    } catch (ex) {
      setCantDelete(true);
      console.log('delete failed', ex);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setCurrentPW(value);
  }

  return (
    <section>
      <h2>Delete Account</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <input
          type="hidden"
          name="email"
          autoComplete="email"
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
        {cantDelete && (
          <Alert severity="error">
            Oops, couldn't delete your account. Please check your password
            and try again.
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
        >
          Delete Account
        </Button>
      </Box>
    </section>
  );
}
