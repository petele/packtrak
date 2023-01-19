import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container
} from '@mui/material';

import LoadingSpinner from '../components/LoadingSpinner';
import PackageEditor from '../components/PackageEditor';
import getPackage from '../helpers/getPackage';
import updatePackage from '../helpers/updatePackage';

export default function Edit({uid}) {
  document.title = `Edit Package - PackTrak`;

  const {kind, id} = useParams();
  const navigate = useNavigate();

  const [pkgData, setPkgData] = React.useState(null);

  React.useEffect(() => {
    if (uid === null) {
      return navigate('/signin');
    }
    if (uid === -1 || !kind || !id) {
      return;
    }
    getPackage(kind, id)
      .then((pkgData) => {
        setPkgData(pkgData);
      })
      .catch((ex) => {
        navigate('/not-found');
      });
  }, [uid, kind, id, navigate]);

  if (uid === null || uid === -1) {
    return null;
  }

  const saveEdits = async (data) => {
    return updatePackage(kind, id, data, pkgData);
  };

  const returnToIncoming = () => {
    navigate(`/${kind}`);
  };

  if (!pkgData) {
    return (
      <Container component="main" sx={{marginTop: 2}}>
        <LoadingSpinner />
      </Container>
    )
  }

  return (
    <Container component="main" sx={{marginTop: 2}}>
      <PackageEditor
          mode="edit"
          id={id} kind={kind} pkgData={pkgData}
          fnReturn={returnToIncoming} fnSave={saveEdits} />
    </Container>
  );
}
