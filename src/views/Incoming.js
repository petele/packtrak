import { Link } from 'react-router-dom';

import {
  Box,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Incoming(props) {
  document.title = `Incoming - PackTrak`;

  return (
    <Box>
      <PackageTable kind="incoming" uid={props.uid} />
      <Fab component={Link} to="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
