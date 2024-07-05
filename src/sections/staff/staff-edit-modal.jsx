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
        staffId: staff ? staff.staffId : '',
        userName: staff ? staff.userName : '',
        email: staff ? staff.email : '',
        password: staff ? staff.password : '',
        roleId: staff ? staff.roleId : '',
        counterId: staff ? staff.counterId : '',
        status: staff ? staff.status : '',
    });

    React.useEffect(() => {
        if (staff) {
            setFormState({
                staffId: staff.staffId,
                userName: staff.userName,
                email: staff.email,
                password: staff.password,
                roleId: staff.roleId,
                counterId: staff.counterId,
                status: staff.status,
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
                    name="staffId"
                    label="Staff ID"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={formState.staffId}
                />

                <TextField
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
                    value={formState.counterId}
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

StaffEditForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    staff: PropTypes.shape({
        staffId: PropTypes.any,
        userName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        roleId: PropTypes.string,
        counterId: PropTypes.any,
        status: PropTypes.string,
    }),
};

export default StaffEditForm;