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
import { toast } from 'react-toastify';

function StaffEditForm({ open, onClose, onSubmit, staff }) {
  const [formState, setFormState] = React.useState({
    username: '',
    email: '',
    password: '',
    roleId: '',
    fullName: '',
    gender: '',
  });

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (staff) {
      setFormState({
        username: staff.username || '',
        email: staff.email || '',
        password: staff.password || '',
        roleId: staff.roleId || '',
        fullName: staff.fullName || '',
        gender: staff.gender || '',
      });
    }
  }, [staff]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.username) newErrors.username = 'Username is required';
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formState.password) newErrors.password = 'Password is required';
    if (!formState.roleId) newErrors.roleId = 'Role is required';
    if (!formState.fullName) newErrors.fullName = 'Full Name is required';
    if (!formState.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formState);
      toast.success('Staff updated');
      onClose();
    } else {
      toast.error('Please fix the validation errors');
    }
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
          error={!!errors.username}
          helperText={errors.username}
          InputProps={{ style: { marginBottom: 10 } }}
        />

        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          onChange={handleChange}
          value={formState.email}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{ style: { marginBottom: 10 } }}
        />

        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          onChange={handleChange}
          value={formState.password}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{ style: { marginBottom: 10 } }}
        />

        <TextField
          margin="dense"
          name="fullName"
          label="Full Name"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.fullName}
          error={!!errors.fullName}
          helperText={errors.fullName}
          InputProps={{ style: { marginBottom: 10 } }}
        />

        <TextField
          margin="dense"
          name="gender"
          label="Gender"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.gender}
          error={!!errors.gender}
          helperText={errors.gender}
          InputProps={{ style: { marginBottom: 10 } }}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="roleId"
            label="Role"
            value={formState.roleId}
            onChange={handleChange}
            error={!!errors.roleId}
            helpertext={errors.roleId}
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


