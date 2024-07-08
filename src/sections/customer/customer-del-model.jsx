import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function CustomerDeleteForm({ open, onClose, onDelete, customer }) {
  const handleDeleteClick = () => {
    onDelete(customer.customerId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Customer</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Customer ID:</Typography>
            <Typography>{customer.customerId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">User Name:</Typography>
            <Typography>{customer.userName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Full Name:</Typography>
            <Typography>{customer.fullName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Email:</Typography>
            <Typography>{customer.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Phone:</Typography>
            <Typography>{customer.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Address:</Typography>
            <Typography>{customer.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Gender:</Typography>
            <Typography>{customer.gender}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Point:</Typography>
            <Typography>{customer.point}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDeleteClick} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CustomerDeleteForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    userName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    point: PropTypes.number,
  }).isRequired,
};
