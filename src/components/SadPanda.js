import { Link as RouterLink } from 'react-router-dom';

import {
  Container,
  Link,
  Typography
} from '@mui/material';

import Copyright from '../components/Copyright';

export default function SadPanda({reason, backURL}) {

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography component="h1" variant="h5">
        You found the sad Panda
      </Typography>
      <img src="/img/sadpanda.png" alt="crying panda" height="300" />
      <Typography component="p" variant="body1" sx={{marginTop: 1}}>
        Panda is sad because {reason}. Sorry.
      </Typography>
      {backURL && (
        <Typography component="p">
          <Link component={RouterLink} to={backURL} variant="body1">
            Go back
          </Link>
        </Typography>
      )}
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
