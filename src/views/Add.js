import * as React from 'react';
import Container from '@mui/material/Container';

import PackageEditor from '../components/PackageEditor';

export default function Add(props) {
  return (
    <Container>
      <PackageEditor mode="add" uid={props.uid} />
    </Container>
  );
}
