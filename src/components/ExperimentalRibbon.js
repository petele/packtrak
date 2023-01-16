import { Link as RouterLink } from 'react-router-dom';

import {
  Link,
} from '@mui/material';

import './ExperimentalRibbon.css';

export default function ExperimentalRibbon(props) {
  return (
    <Link component={RouterLink} className="github-fork-ribbon left-top" to="/about" data-ribbon="Experimental" title="Experimental">P</Link>
  );
}
