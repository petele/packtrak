
import {
  TableBody,
} from '@mui/material';

import PackageTableRow from './PackageTableRow';
import PackageTableRowSkeleton from './PackageTableRowSkeleton';

export default function PackageTableBody({rows, kind, width}) {

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
        <PackageTableRow key={row.id} row={row} kind={kind} width={width} />
      ))}
    </TableBody>
  );
}
