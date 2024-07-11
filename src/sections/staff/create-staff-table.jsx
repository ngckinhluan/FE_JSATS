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

function StaffForm({ open, onClose, onSubmit }) {
    const initialFormState = {
        roleId: '3', // Start with blank role
        username: '',
        fullName: '',
        gender: '', 
        email: '',
        password: ''
        password: ''
    };

    const [formState, setFormState] = React.useState(initialFormState);
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formState.username) newErrors.username = 'Username is required';
        if (!formState.fullName) newErrors.fullName = 'Full Name is required';
        if (!formState.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formState.password) newErrors.password = 'Password is required';
        if (!formState.gender) newErrors.gender = 'Gender is required';
        if (!formState.roleId) newErrors.roleId = 'Role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formState);
            //toast.success('New staff added successfully');
            setFormState(initialFormState);
            onClose();
        } else {
            toast.error('Please fix the validation errors');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Staff</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="username"
                    label="User Name"
                    name="username"
                    label="User Name"
                    type="text"
                    fullWidth
                    value={formState.username}
                    value={formState.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    InputProps={{ style: { marginBottom: 10 } }}
                />

                <TextField
                    margin="dense"
                    name="fullName"
                    label="Full Name"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    value={formState.fullName}
                    value={formState.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{ style: { marginBottom: 10 } }}
                />

                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    type="email"
                    fullWidth
                    value={formState.email}
                    value={formState.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{ style: { marginBottom: 10 } }}
                />

                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    type="password"
                    fullWidth
                    value={formState.password}
                    value={formState.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{ style: { marginBottom: 10 } }}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="role-label">Role</InputLabel>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="roleId"
                        label="Role"
                        label="Role"
                        value={formState.roleId}
                        onChange={handleChange}
                        error={!!errors.roleId}
                    >
                        <MenuItem value="">Select Role</MenuItem>
                        <MenuItem value="3">Staff</MenuItem>
                        <MenuItem value="2">Manager</MenuItem>
                    </Select>
                    {errors.roleId && <p style={{ color: 'red', margin: '5px 0' }}>{errors.roleId}</p>}
                </FormControl>

                {/* Assuming gender is optional */}
                {/* <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    name="gender"
                    label="Gender"
                    type="text"
                    fullWidth
                    value={formState.gender}
                    value={formState.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
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

StaffForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default StaffForm;

