import {
  Box,
  Container,
  Link,
  Typography
} from '@mui/material';

export default function NoMatch(props) {

  const backURL = props.uid ? '/incoming' : '/';

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          You found the sad Panda
        </Typography>
        <img src="/img/sadpanda.png" alt="crying panda" />
        <div>
          Panda is sad because it can't find what you're looking for. Sorry.
        </div>
        <div>
          <Link href={backURL} variant="body1">
            Go back
          </Link>
        </div>
      </Box>
    </Container>
  );
}
