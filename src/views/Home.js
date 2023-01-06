import { Container, Typography } from '@mui/material';

export default function Home() {
  document.title = 'PackTrak';

  return (
    <Container component="main" fixed>
      <Typography component="h1" variant="h4">
        PackTrak
      </Typography>
    </Container>
  );
}
