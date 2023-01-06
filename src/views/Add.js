import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container
} from '@mui/material';

import PackageEditor from '../components/PackageEditor';

import addPackage from '../helpers/addPackage';

export default function Add(props) {
  document.title = `Add Package - PackTrak`;

  const navigate = useNavigate();

  if (!props.uid) {
    return;
  }

  const savePackage = async (uid, data) => {
    return addPackage(uid, data);
  };

  const returnToIncoming = () => {
    navigate('/incoming');
  };

  return (
    <Container component="main" sx={{marginTop: 2}}>
      <PackageEditor
        mode="add"
        uid={props.uid}
        fnReturn={returnToIncoming} fnSave={savePackage} />
    </Container>
  );
}
