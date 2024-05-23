import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const ConfirmationDialog = ({open, onClose, onConfirm}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure that you want to cancel the lesson?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} sx={{color: 'var(--secondary-dark-color)'}} autoFocus>
                    Yes
                </Button>
                <Button onClick={onClose} sx={{color: 'var( --cancel-element-color)'}}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
