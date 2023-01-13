
import {
  TableBody,
  useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import PackageTableRow from './PackageTableRow';
import PackageTableRowSkeleton from './PackageTableRowSkeleton';

export default function PackageTableBody(props) {
  const rows = props.rows;
  const uid = props.uid;
  const kind = props.kind;

  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('sm'));

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
        <PackageTableRow key={row.id} row={row} uid={uid} kind={kind} wide={isWide} />
      ))}
    </TableBody>
  );
}
