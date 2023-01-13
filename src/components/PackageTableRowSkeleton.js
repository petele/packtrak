
import {
  Skeleton,
  TableCell,
  TableRow,
} from '@mui/material';


export default function PackageTableRowSkeleton(props) {

  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="rectangular" animation="wave" width={32} height={32} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={200}  />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={200} />
        <Skeleton animation="wave" width={200} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={200} height={32} />
      </TableCell>
    </TableRow>
  );
}
