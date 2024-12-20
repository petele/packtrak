import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container
} from '@mui/material';

import { useDocumentTitle } from '../components/useDocumentTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import PackageEditor from '../components/PackageEditor';
import getPackage from '../helpers/getPackage';
import updatePackage from '../helpers/updatePackage';

export default function Edit({uid, isOnline}) {
  useDocumentTitle(`Edit Package`);

  const {kind, id} = useParams();
  const navigate = useNavigate();

  const [pkgBefore, setPkgBefore] = React.useState(null);

  React.useEffect(() => {
    if (uid === null) {
      return navigate('/signin');
    }
    if (uid === -1 || !kind || !id) {
      return;
    }
    getPackage(kind, id)
      .then((pkgData) => {
        setPkgBefore(pkgData);
      })
      .catch((ex) => {
        navigate('/not-found');
      });
    window.gtag('event', 'page_view', {
      page_title: 'Edit Package',
      page_location: `/edit/${kind}/`,
    });
  }, [uid, kind, id, navigate]);

  if (uid === null || uid === -1) {
    return null;
  }

  const saveEdits = async (pkgAfter) => {
    return updatePackage(kind, id, pkgBefore, pkgAfter);
  };

  if (!pkgBefore) {
    return (
      <Container component="main" sx={{marginTop: 2}}>
        <LoadingSpinner />
      </Container>
    )
  }

  return (
    <Container component="main" sx={{marginTop: 2}}>
      <PackageEditor
          id={id} kind={kind} pkgData={pkgBefore} fnSave={saveEdits} isOnline={isOnline} />
    </Container>
  );
}
