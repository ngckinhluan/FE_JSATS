import React from 'react';
import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { InputLabel, FormControl } from '@mui/material';

function StaffEditForm({ open, onClose, onSubmit, staff }) {
  const [formState, setFormState] = React.useState({
    username: staff ? staff.username : '',
    email: staff ? staff.email : '',
    password: staff ? staff.password : '',
    roleId: staff ? staff.roleId : '',
    fullName: staff ? staff.fullName : '',
    gender: staff ? staff.gender : '',
  });

  React.useEffect(() => {
    if (staff) {
      setFormState({
        username: staff.username,
        email: staff.email,
        password: staff.password,
        roleId: staff.roleId,
        fullName: staff.fullName,
        gender: staff.gender,
      });
    }
  }, [staff]);

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
      <DialogTitle id="form-dialog-title">Edit Staff</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.username}
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
          name="password"
          label="Password"
          type="password"
          fullWidth
          onChange={handleChange}
          value={formState.password}
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
          name="gender"
          label="Gender"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.gender}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="roleId"
            label="Role"
            value={formState.roleId}
            onChange={handleChange}
          >
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

StaffEditForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  staff: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    roleId: PropTypes.string,
    fullName: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default StaffEditForm;
