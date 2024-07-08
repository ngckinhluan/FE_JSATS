import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function CustomerEditForm({ open, onClose, onSubmit, customer }) {
  const [formState, setFormState] = useState({
    customerId: '',
    userName: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    point: 0,
  });

  useEffect(() => {
    if (customer) {
      setFormState({
        customerId: customer.customerId || '',
        userName: customer.userName || '',
        fullName: customer.fullName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        gender: customer.gender || '',
        address: customer.address || '',
        point: customer.point || 0,
      });
    }
  }, [customer]);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="userName"
          label="User Name"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.userName}
        />
        <TextField
          margin="dense"
          name="fullName"
          label="Full Name"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.fullName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          onChange={handleChange}
          value={formState.email}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone Number"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.phone}
        />
        <FormControl margin="dense" fullWidth>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formState.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.address}
        />
        <TextField
          margin="dense"
          name="point"
          label="Point"
          type="number"
          fullWidth
          onChange={handleChange}
          value={formState.point}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

CustomerEditForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    customerId: PropTypes.string,
    userName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    point: PropTypes.number,
  }),
};

export default CustomerEditForm;
