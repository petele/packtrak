import {
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Delivered(props) {
  document.title = `Delivered - PackTrak`;

  return (
    <div>
      <PackageTable kind="delivered" uid={props.uid} />
      <Fab href="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
