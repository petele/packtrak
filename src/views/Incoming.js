import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDocumentTitle } from '../components/useDocumentTitle';
import PackageTable from '../components/PackageTable/PackageTable';

export default function Incoming({uid, isOnline}) {
  useDocumentTitle('Incoming');

  const navigate = useNavigate();

  const handleKeyPress = useCallback((event) => {
    if (event.key === '+') {
      navigate('/add');
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (uid === null) {
      return navigate('/signin');
    }
  }, [uid, navigate]);

  if (uid === null || uid === -1) {
    return null;
  }

  return (
    <Container component="main" sx={{marginTop: 1}}>
      <PackageTable kind="incoming" />
      <Fab component={Link} to="/add" color="primary" aria-label="add" disabled={!isOnline}>
        <AddIcon />
      </Fab>
    </Container>
  );
}
