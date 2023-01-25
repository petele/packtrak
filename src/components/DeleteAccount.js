import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import ConfirmDialog from './ConfirmDialog';
import { getUserEmail } from '../helpers/fbHelper';
import { deleteUserData } from '../helpers/deleteUserData';
import { gaEvent, gaError } from '../helpers/gaHelper';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const userEmail = getUserEmail() || '';
  const [currentPW, setCurrentPW] = React.useState('');
  const [cantDelete, setCantDelete] = React.useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setCantDelete(null);
    setConfirmDialogVisible(true);
  };

  async function handleConfirmDelete(confirmed) {
    setConfirmDialogVisible(false);
    setCurrentPW('');
    if (confirmed !== true) {
      return;
    }
    try {
      await deleteUserData(currentPW);
      gaEvent('delete_account');
      navigate('/');
    } catch (ex) {
      gaError('delete_account_failed', false, ex);
      setCantDelete(true);
    }
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    setCurrentPW(value);
  }

  return (
    <Box component="section">
      <ConfirmDialog
        open={confirmDialogVisible}
        callback={handleConfirmDelete}
        details="This will permanently delete your account and all data."
        label="Delete"
      />
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <input
            type="hidden"
            name="email"
            autoComplete="username"
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
          <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="error"
            >
              Delete Account
            </Button>
            {cantDelete && (
              <Alert severity="error" sx={{flexGrow: 1}}>
                Oops, couldn't delete your account. Please check your password
                and try again.
              </Alert>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
