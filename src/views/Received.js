import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Received() {
  return (
    <div>
      <PackageTable kind="received" />
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
