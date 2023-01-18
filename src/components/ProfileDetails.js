import * as React from 'react';

import {
  Box,
  Typography,
} from '@mui/material';

import { getUser } from '../helpers/fbHelper';

export default function ProfileDetails(props) {

  const user = getUser();
  if (user === null) {
    return null;
  }

  const opts = {
    dateStyle: 'full',
    timeStyle: 'medium'
  };
  const dtFormatter = new Intl.DateTimeFormat('lookup', opts);

  const uid = user.uid;
  const email = user.email;
  const accountCreatedDT = new Date(parseInt(user.metadata.createdAt, 10));
  const accountCreated = dtFormatter.format(accountCreatedDT);
  const lastLoginDT = new Date(parseInt(user.metadata.lastLoginAt, 10));
  const lastLogin = dtFormatter.format(lastLoginDT);

  console.log('user', user);

  return (
    <Box component="section" sx={{marginTop: 4}}>
      <Typography component="h2" variant="h6">
        Profile Info
      </Typography>
      <div>
        <b>User ID:</b> {uid}
      </div>
      <div>
        <b>Email Address:</b> {email}
      </div>
      <div>
        <b>Account Created On:</b> {accountCreated.toString()}
      </div>
      <div>
        <b>Last Login:</b> {lastLogin.toString()}
      </div>
    </Box>
  );

}
