import * as React from 'react';

import Container from '@mui/material/Container';

import {useParams} from "react-router-dom";

import PackageEditor from '../components/PackageEditor';

export default function Edit() {
  const {id} = useParams('id');
  const [packageInfo, setPackageInfo] = React.useState({});

  React.useEffect(() => {
    fetch(`/tempData/${id}.json`)
      .then(res => res.json())
      .then((result) => {
        setPackageInfo(result);
      })
      .then(() => {
        console.log('st', packageInfo);
      });
  }, [id]);

  return (
    <Container>
      <PackageEditor package={packageInfo} />
    </Container>
  );
}
