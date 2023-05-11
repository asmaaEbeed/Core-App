import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AlertDialogTextInpt from './AlertDialogTextInpt';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AlertDialog = ({dialogIsOpen, changeToClose, title, content, btnCancelTitle, btnAgreeTitle, confirmDialog, handleDialogInptTxtValue, dialogInptTxtValue, isInputTextExist }) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    changeToClose(false);
  };
  const handleConfirm = () => {
    confirmDialog();
  }

  return (
    <div>
      <Dialog
        open={dialogIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
          {isInputTextExist && <AlertDialogTextInpt dialogInptTxtValue={dialogInptTxtValue} handleDialogInptTxtValue={handleDialogInptTxtValue} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>{btnAgreeTitle}</Button>
          <Button onClick={handleClose}>{btnCancelTitle}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertDialog
