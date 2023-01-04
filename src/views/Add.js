import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container
} from '@mui/material';

import PackageEditor from '../components/PackageEditor';

import addPackage from '../helpers/addPackage';

export default function Add(props) {
  const navigate = useNavigate();

  if (!props.uid) {
    return;
  }

  const savePackage = async (data) => {
    return addPackage(props.uid, data);
  };

  const returnToIncoming = () => {
    navigate('/incoming');
  };

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
        <PackageEditor
          mode="add"
          uid={props.uid}
          fnReturn={returnToIncoming} fnSave={savePackage} />
      </Box>
    </Container>
  );
}
