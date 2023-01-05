import {
  Box,
  Container,
  Typography
} from '@mui/material';

export default function About() {

  document.title = `About - PackTrak`;

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography component="h1" variant="h5">
          About PackTrak
        </Typography>
      </Box>
    </Container>
  );
}
