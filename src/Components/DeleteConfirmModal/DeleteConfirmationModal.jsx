
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteConfirmationModal(props) {
  const { open, handleClose, title, deleteData } = props;

  const handleAgree = () => {
    deleteData();
    handleClose();
  };
  return (
    <React.Fragment>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <Alert severity="error" style={{ backgroundColor: "white", display: "flex", alignItems: "flex-end", justifyContent: "center" }}></Alert>
        <DialogTitle style={{ fontWeight: "bold", fontSize: "18.5px", textAlign: "center" }}>{`Delete ${title}`}</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-slide-description" style={{ color: "black", fontFamily: "poppins", fontSize: "15px" }}>
            Are your sure do you want to delete this {title} ?
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description" style={{ color: "black", fontFamily: "poppins", fontSize: "14px" }}>
            your all transactions will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree}>Agree</Button>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}