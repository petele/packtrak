import { Link as RouterLink } from 'react-router-dom';

import {
  Link
} from '@mui/material';

export default function TOSLabel() {
  return (
    <div>
      I understand this site is <Link component={RouterLink} color="inherit" target="_blank" to="/about">
        experimental
      </Link>.

    </div>
  );
}
