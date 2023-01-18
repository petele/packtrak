import * as React from 'react';

import {
  Box,
} from '@mui/material';

import { getUser } from '../helpers/fbHelper';

export default function ProfileDetails() {
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
  const accountCreatedDT = new Date(parseInt(user.metadata.createdAt, 10));
  const accountCreated = dtFormatter.format(accountCreatedDT);
  const lastLoginDT = new Date(parseInt(user.metadata.lastLoginAt, 10));
  const lastLogin = dtFormatter.format(lastLoginDT);

  return (
    <Box component="section">
      <div>
        <b>User ID:</b> <span>{uid}</span>
      </div>
      <div>
        <b>Account Created On:</b> <span>{accountCreated}</span>
      </div>
      <div>
        <b>Last Login:</b> <span>{lastLogin}</span>
      </div>
    </Box>
  );

}
