import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


function CustomerEditForm({ open, onClose, onSubmit, customer }) {
    const [formState, setFormState] = React.useState({
        CusID: customer ? customer.CusID : '',
        name: customer ? customer.name : '',
        address: customer ? customer.address : '',
        phoneNumber: customer ? customer.phoneNumber : '',
        point: customer ? customer.point : '',
        gender: customer ? customer.gender : '',
    });

  React.useEffect(() => {
    if (customer) {
      setFormState({
        CusID: customer.CusID,
        name: customer.name,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
        point: customer.point,
        gender: customer.gender,
        
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
          name="promotionId"
          label="Promotion ID"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.CusID}
        />
        <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    value={formState.name}
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ style: { marginBottom: 10 } }}
                />
                <TextField
                    margin="dense"
                    name="address"
                    label="Address"
                    value={formState.address}
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ style: { marginBottom: 10 } }}
                />
                <TextField
                    margin="dense"
                    name="phoneNumber"
                    label="Phone Number"
                    value={formState.phoneNumber}
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ style: { marginBottom: 10 } }}
                />
                <TextField
                    margin="dense"
                    name="point"
                    label="Point"
                    value={formState.point}
                    type="point"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ style: { marginBottom: 10 } }}
                />
                <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    value={formState.gender}
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    InputProps={{ style: { marginBottom: 10 } }}
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
    CusID: PropTypes.any,
    name: PropTypes.string,
    address: PropTypes.any,
    phoneNumber: PropTypes.any,
    point: PropTypes.number,
    gender: PropTypes.string,
  }),
};

export default CustomerEditForm; 