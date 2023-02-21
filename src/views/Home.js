import { Container, Typography } from '@mui/material';

import { useDocumentTitle } from '../components/useDocumentTitle';
import WhatIsPackTrak from '../components/WhatIsPackTrak';

export default function Home() {
  useDocumentTitle('');

  return (
    <Container component="main" fixed sx={{mt: 4}}>
      <Typography component="h1" variant="h4">
        PackTrak
      </Typography>
      <WhatIsPackTrak />
    </Container>
  );
}
