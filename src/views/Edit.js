import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container
} from '@mui/material';

import LoadingSpinner from '../components/LoadingSpinner';
import PackageEditor from '../components/PackageEditor';
import getPackage from '../helpers/getPackage';
import updatePackage from '../helpers/updatePackage';

export default function Edit(props) {
  document.title = `Edit Package - PackTrak`;

  const uid = props.uid;
  const {kind, id} = useParams();
  const navigate = useNavigate();

  const [pkgData, setPkgData] = React.useState(null);

  React.useEffect(() => {
    if (!uid || !kind || !id) {
      return;
    }
    getPackage(uid, kind, id)
      .then((pkgData) => {
        setPkgData(pkgData);
      })
      .catch((ex) => {
        navigate('/not-found');
      });
  }, [uid, kind, id, navigate]);

  const saveEdits = async (userID, data) => {
    return updatePackage(userID, kind, id, data, pkgData);
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
          id={id} kind={kind} uid={uid} pkgData={pkgData}
          fnReturn={returnToIncoming} fnSave={saveEdits} />
    </Container>
  );
}
