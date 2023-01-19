import {
  Box,
  CircularProgress
} from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CircularProgress />
    </Box>
  );
}
