import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import { useDocumentTitle } from '../components/useDocumentTitle';
import PackageEditor from '../components/PackageEditor';
import addPackage from '../helpers/addPackage';

export default function Add({uid}) {
  useDocumentTitle(`Add Package`);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (uid === null) {
      return navigate('/signin');
    }
  }, [uid, navigate]);

  if (uid === -1 || uid === null) {
    return null;
  }

  const savePackage = async (data) => {
    data.delivered = false;
    return addPackage(data);
  };

  return (
    <Container component="main" sx={{marginTop: 2}}>
      <PackageEditor fnSave={savePackage} />
    </Container>
  );
}
