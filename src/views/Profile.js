import {
  Box,
  Container,
  Typography
} from '@mui/material';

export default function Profile(props) {
  document.title = `Profile - PackTrak`;

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
          Profile
        </Typography>
        <div>{props.uid}</div>
      </Box>
    </Container>
  );
}
