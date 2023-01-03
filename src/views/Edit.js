import * as React from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Container
} from '@mui/material';

import PackageEditor from '../components/PackageEditor';

export default function Edit(props) {
  const {kind, id} = useParams();

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
       <PackageEditor mode="edit" id={id} kind={kind} uid={props.uid} />
    </Box>
  </Container>
  );
}
