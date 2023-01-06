import {
  Container,
  Link,
  Typography
} from '@mui/material';

import Copyright from '../components/Copyright';

export default function NoMatch(props) {
  document.title = `Sad Panda - PackTrak`;

  const backURL = props.uid ? '/incoming' : '/';

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
      <img src="/img/sadpanda.png" alt="crying panda" />
      <Typography component="p" variant="body1" sx={{marginTop: 1}}>
        Panda is sad because it can't find what you're looking for. Sorry.
      </Typography>
      <Typography component="p">
        <Link href={backURL} variant="body1">
          Go back
        </Link>
      </Typography>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
