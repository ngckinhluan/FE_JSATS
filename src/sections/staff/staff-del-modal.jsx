import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';

export default function StaffDeleteForm({ open, onClose, onDelete, staff }) {
  const handleDeleteClick = async () => {
    try {
      await onDelete(staff.userId);
      toast.success(`Staff member ${staff.username} deleted successfully`);
      onClose();
    } catch (error) {
      toast.error(`Failed to delete staff member ${staff.username}`);
      console.error('Delete error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Staff</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">User ID:</Typography>
            <Typography>{staff.userId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Username:</Typography>
            <Typography>{staff.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Email:</Typography>
            <Typography>{staff.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Role Name:</Typography>
            <Typography>{staff.roleName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Counter Number:</Typography>
            <Typography>{staff.counterNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Status:</Typography>
            <Typography>{staff.status ? 'Active' : 'Inactive'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleDeleteClick} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

StaffDeleteForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  staff: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roleName: PropTypes.string.isRequired,
    counterNumber: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

