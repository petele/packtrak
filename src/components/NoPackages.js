
import {
  Box,
  Typography
} from '@mui/material';

export default function NoPackages(props) {
  return (
    <Box
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography component="h1" variant="h5">
        You found the sad Panda
      </Typography>
      <img src="/img/sadpanda.png" alt="crying panda" />
      <Typography component="p" variant="body1" sx={{marginTop: 1}}>
        Panda is sad because you haven't added any packages yet.
      </Typography>
    </Box>
  );
}
