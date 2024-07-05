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
        staffId: '',
        userName: '',
        email: '',
        password: '',
        roleId: '',
        counterId: '',
        status: '',
    };

    const [formState, setFormState] = React.useState(initialFormState);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành động submit mặc định của form
        onSubmit(formState); // Gọi addPromotion
        setFormState(initialFormState); // Clear các trường của form sau khi submit
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Staff</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="staffId"
                    label="Staff ID"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="userName"
                    label="User Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />

                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="role-label">Role ID</InputLabel>
                    <Select
                        labelId="role-label"
                        name="roleId"
                        label="Role ID"
                        value={formState.roleId}
                        onChange={handleChange}
                    >
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    name="counterId"
                    label="Counter ID"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        name="status"
                        label="Status"
                        value={formState.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
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

StaffForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default StaffForm;