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

function StaffForm({ open, onClose, onSubmit }) {
    const initialFormState = {
        roleId: '3', // Default to 'Staff' role
        username: '',
        fullName: '',
        gender: '', // Assuming gender is not required
        email: '',
        password: ''
    };

    const [formState, setFormState] = React.useState(initialFormState);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
        setFormState(initialFormState);
        onClose();
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
                    type="text"
                    fullWidth
                    value={formState.username}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    value={formState.fullName}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={formState.email}
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={formState.password}
                    onChange={handleChange}
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
                        <MenuItem value="3">Staff</MenuItem>
                        <MenuItem value="1">Admin</MenuItem>
                        <MenuItem value="2">Manager</MenuItem>
                    </Select>
                </FormControl>

                {/* Assuming gender is optional */}
                {/* <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    type="text"
                    fullWidth
                    value={formState.gender}
                    onChange={handleChange}
                /> */}

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
