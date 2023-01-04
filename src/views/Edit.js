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

  const saveEdits = async (data) => {
    const prevValue = {};
    return updatePackage(uid, kind, id, data, prevValue);
  };

  const returnToIncoming = () => {
    navigate('/incoming');
  };

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <PackageEditor
            mode="edit"
            id={id} kind={kind} uid={uid} pkgData={pkgData}
            fnReturn={returnToIncoming} fnSave={saveEdits} />
      </Box>
    </Container>
  );
}
