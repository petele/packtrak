import {
  Alert,
  AlertTitle,
  Container,
  Link,
  Typography
} from '@mui/material';

export default function About() {
  document.title = `About - PackTrak`;

  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: 2}}>
      <Alert severity='error'>
        <AlertTitle>Experimental</AlertTitle>
        PackTrak is an experiement and <b>should not</b> be used with real
        data.
      </Alert>

      <Typography variant="body1" sx={{marginTop: 4}}>
        PackTrak is a tool to help you track your incoming
        packages. I wrote it to experiement with, and learn about React.
        You can find all of the source code
        on <Link href="https://github.com/petele/packtrak">GitHub</Link>.
      </Typography>

      <Typography variant="h5" component="h2" sx={{marginTop: 4}}>
        Terms of Service &amp; Privacy Policy
      </Typography>

      <Typography variant="body1">
        By using this site, you understand:
      </Typography>

      <Typography variant="body1">
        <ul>
          <li>Data may be deleted at any time.</li>
          <li>
            You will not provide any <b>real</b> data, including actual
            tracking numbers.
          </li>
          <li>Google Analytics is used.</li>
          <li>User data is not encrypted on the server.</li>
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
