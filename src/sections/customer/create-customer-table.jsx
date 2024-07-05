import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function CustomerForm({ open, onClose, onSubmit }) {
    const initialFormState = {
        userName: '',
        fullName: '',
        email: '',
        phone: '',
        gender: 'female',
        address: '',
        point: 0,
    };

    const [formState, setFormState] = React.useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(formState); 
        setFormState(initialFormState); 
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="userName"
                    label="User Name"
                    type="text"
                    value={formState.userName}
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    value={formState.fullName}
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    value={formState.email}
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="phone"
                    label="Phone Number"
                    type="text"
                    value={formState.phone}
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="point"
                    label="Point"
                    type="number"
                    value={formState.point}
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="address"
                    label="Address"
                    type="text"
                    value={formState.address}
                    fullWidth
                    onChange={handleChange}
                />
                <FormControl>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

CustomerForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CustomerForm;
