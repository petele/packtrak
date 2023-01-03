import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Incoming(props) {
  return (
    <div>
      <PackageTable kind="incoming" uid={props.uid} />
      <Fab href="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
