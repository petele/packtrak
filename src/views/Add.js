import * as React from 'react';

import {
  Box,
  Container
} from '@mui/material';

import PackageEditor from '../components/PackageEditor';

export default function Add(props) {

  if (!props.uid) {
    return;
  }

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <PackageEditor mode="add" uid={props.uid} />
      </Box>
    </Container>
  );
}
