import Container from '@mui/material/Container';

import PackageEditor from '../components/PackageEditor';

export default function Add() {
  return (
    <Container>
      <PackageEditor mode="add" />
    </Container>
  );
}
