import {
  Box,
  Container,
  Typography
} from '@mui/material';

import ProfileDetails from '../components/ProfileDetails';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';

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
        <ProfileDetails uid={props.uid} />
        <ChangePassword uid={props.uid} />
        <DeleteAccount uid={props.uid} />
      </Box>
    </Container>
  );
}
