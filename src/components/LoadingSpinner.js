import {
  Box,
  CircularProgress
} from '@mui/material';

export default function LoadingSpinner(props) {
  return (
    <Box sx={{width: 300}}>
      <CircularProgress />
    </Box>
  );
}
