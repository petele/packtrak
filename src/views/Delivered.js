import { Link } from 'react-router-dom';
import {
  Container,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Delivered(props) {
  document.title = `Delivered - PackTrak`;

  return (
    <Container component="main" sx={{marginTop: 1}}>
      <PackageTable kind="delivered" uid={props.uid} />
      <Fab component={Link} to="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}
