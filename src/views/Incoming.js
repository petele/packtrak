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
      <Fab href="/add" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
