import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  const handleClose = () => {
    props.callback(false);
  };

  const clickCancel = () => {
    props.callback(false);
  }

  const clickConfirm = () => {
    props.callback(true);
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.details}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={clickCancel} autoFocus>Cancel</Button>
        <Button onClick={clickConfirm}>
          {props.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
