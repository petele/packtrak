import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDocumentTitle } from '../components/useDocumentTitle';
import PackageTable from '../components/PackageTable/PackageTable';

export default function Delivered({uid, isOnline}) {
  useDocumentTitle(`Delivered`);

  const [days, setDays] = useState(30);
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

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <Container component="main" sx={{marginTop: 1}}>
      <PackageTable kind="delivered" daysBack={days} />
      <FormControl sx={{ m: 0, minWidth: 120, mb: 12, float:'right' }} size="small">
        <InputLabel id="lblDaysBack">Last</InputLabel>
        <Select
          labelId="lblDaysBack"
          id="selDaysBack"
          value={days}
          label="Last"
          onChange={handleDaysChange}>
          <MenuItem value={7}>week</MenuItem>
          <MenuItem value={30}>month</MenuItem>
          <MenuItem value={90}>3 months</MenuItem>
          <MenuItem value={180}>6 months</MenuItem>
          <MenuItem value={365}>year</MenuItem>
        </Select>
      </FormControl>
      <Fab component={Link} to="/add" color="primary" aria-label="add" disabled={!isOnline}>
        <AddIcon />
      </Fab>
    </Container>
  );
}
