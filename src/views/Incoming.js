import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable/PackageTable';

export default function Incoming(props) {
  document.title = `Incoming - PackTrak`;

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

  return (
    <Container component="main" sx={{marginTop: 1}}>
      <PackageTable kind="incoming" uid={props.uid} />
      <Fab component={Link} to="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}
