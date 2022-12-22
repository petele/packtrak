import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import PackageTable from '../components/PackageTable';

export default function Delivered() {
  return (
    <div>
      <PackageTable kind="delivered" />
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
