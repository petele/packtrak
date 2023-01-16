
import {
  TableBody,
} from '@mui/material';

import PackageTableRow from './PackageTableRow';
import PackageTableRowSkeleton from './PackageTableRowSkeleton';

export default function PackageTableBody(props) {
  const rows = props.rows;
  const uid = props.uid;
  const kind = props.kind;
  const width = props.width;

  if (rows === null) {
    return (
      <TableBody>
        <PackageTableRowSkeleton />
        <PackageTableRowSkeleton />
        <PackageTableRowSkeleton />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <PackageTableRow key={row.id} row={row} uid={uid} kind={kind} width={width} />
      ))}
    </TableBody>
  );
}
