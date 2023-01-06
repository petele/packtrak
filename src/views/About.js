import { Container, Typography } from '@mui/material';

export default function About() {
  document.title = `About - PackTrak`;

  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: 2}}>
      <Typography component="h1" variant="h5">
        PackTrak is <b>EXPERIMENTAL</b>
      </Typography>
      <p>
        PackTrak is an experimental tool to help you track your incoming
        packages. I wrote it to experiement with and learn about React,
        and you can find all of the source code
        on <a href="https://github.com/petele/packtrak">GitHub</a>.
      </p>
      <h2>Terms of Service &amp; Privacy Policy</h2>
      <p>
        By using this site, you understand:
      </p>
      <ul>
        <li>Data may be deleted at any time.</li>
        <li>
          You will not provide any <b>real</b> data, including actual
          tracking numbers.
        </li>
        <li>Google Analytics is used.</li>
        <li>User data is not encrypted on the server.</li>
      </ul>
      <p>
        If you've already created an account, you can use
        the <b>Delete Account</b> feature to immediately delete
        all of your data and your account.
      </p>
    </Container>
  );
}
