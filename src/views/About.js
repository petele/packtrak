import {
  Container,
  Typography
} from '@mui/material';
import WhatIsPackTrak from '../components/WhatIsPackTrak';
import { useDocumentTitle } from '../components/useDocumentTitle';

export default function About() {
  useDocumentTitle('About');

  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: 2}}>
      <WhatIsPackTrak />

      <Typography variant="h5" component="h2" sx={{marginTop: 4}}>
        Terms of Service &amp; Privacy Policy
      </Typography>

      <Typography variant="body1">
        By using this site, you understand and <b>agree</b> to the following:
      </Typography>

      <Typography variant="body1">
        <ul>
          <li>You will <b>NOT</b> use any real data, <b>ever</b>.</li>
          <li>There are no terms, this is an experiment.</li>
          <li>There is no privacy, data is not encrypted on the server.</li>
          <li>Data may be deleted at any time.</li>
          <li>
            You will not provide any <b>real</b> data, including actual
            tracking numbers.
          </li>
          <li>Google Analytics is used.</li>
        </ul>
      </Typography>

      <Typography variant="body1">
        If you've already created an account, you can use
        the <b>Delete Account</b> feature to immediately delete
        all of your data and your account.
      </Typography>
    </Container>
  );
}
