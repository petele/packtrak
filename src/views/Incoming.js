import { Link } from 'react-router-dom';

import {
  Container,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Incoming(props) {
  document.title = `Incoming - PackTrak`;

  return (
    <Container component="main" sx={{marginTop: 1}}>
      <PackageTable kind="incoming" uid={props.uid} />
      <Fab component={Link} to="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}
