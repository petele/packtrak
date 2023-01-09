import {
  Link
} from '@mui/material';

export default function TOSLabel() {
  return (
    <div>
      I understand this site is <Link color="inherit" target="_blank" to="/about">
        experimental
      </Link>.

    </div>
  );
}
