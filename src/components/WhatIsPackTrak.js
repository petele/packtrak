import {
  Alert,
  AlertTitle,
  Box,
  Link,
  Typography
} from '@mui/material';

export default function WhatIsPackTrak() {
  return (
    <Box>
      <Typography variant="body1" sx={{marginTop: 2}}>
        PackTrak is an <b>experiment</b> I wrote to
        learn <Link href="https://reactjs.org">React</Link>, and help
        me track my incoming packages. You can find all of the source code
        on <Link href="https://github.com/petele/packtrak">GitHub</Link>.
      </Typography>

      <Alert severity='error' sx={{marginTop: 4}}>
        <AlertTitle>Experimental: Do not use with real data</AlertTitle>
        PackTrak is an experiement! Do <b>not</b> use any real
        data, period.
      </Alert>
    </Box>
  );
}
