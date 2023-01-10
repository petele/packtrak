import * as React from 'react';

import {
  List
} from '@mui/material';

import PackageListItem from './PackageListItem';
import getPackageList from '../helpers/getPackageList';

import parsePackageList from '../helpers/parsePackageList';

export default function PackageTable(props) {
  const [rows, setRows] = React.useState([]);

  const userID = props.uid;
  const kind = props.kind;

  React.useEffect(() => {
    return getPackageList(userID, kind, (snapshot) => {
      const pkgObj = snapshot.val();
      setRows(parsePackageList(pkgObj, kind));
    });
  }, [userID, kind]);

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {rows.map((row) => (
        <PackageListItem key={row.id} row={row} uid={userID} kind={kind} />
      ))};
    </List>
  );
}
