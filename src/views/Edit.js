import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import {
  Box,
  Container
} from '@mui/material';

import PackageEditor from '../components/PackageEditor';
import getPackage from '../helpers/getPackage';
import updatePackage from '../helpers/updatePackage';

export default function Edit(props) {
  const uid = props.uid;
  const {kind, id} = useParams();
  const navigate = useNavigate();

  if (!uid || !kind || !id) {
    console.log('Edit.js - missing uid, kind, or id');
    return;
  }

  const prevValue = {};

  getPackage(uid, kind, id)
    .then((pkgData) => {
      console.log('package', pkgData);
    });

  const saveEdits = async (data) => {
    return updatePackage(uid, kind, id, data, prevValue);
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
          mode="edit"
          id={id} kind={kind} uid={uid}
          fnReturn={returnToIncoming} fnSave={saveEdits} />
    </Box>
  </Container>
  );
}
