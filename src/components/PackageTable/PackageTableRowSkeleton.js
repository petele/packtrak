
import {
  Skeleton,
  TableCell,
  TableRow,
} from '@mui/material';


export default function PackageTableRowSkeleton(props) {

  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="rectangular" animation="wave" width={24} height={24} />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={'100%'}  />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={'100%'} />
        <Skeleton animation="wave" width={'100%'} sx={{ fontSize: '0.7rem' }}  />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width={'100%'} height={24} />
      </TableCell>
    </TableRow>
  );
}
