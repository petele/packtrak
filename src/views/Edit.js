import * as React from 'react';
import {useParams} from "react-router-dom";

import Container from '@mui/material/Container';

import PackageEditor from '../components/PackageEditor';

export default function Edit() {
  const {kind, id} = useParams();

  return (
    <Container>
      <PackageEditor mode="edit" id={id} kind={kind} />
    </Container>
  );
}
