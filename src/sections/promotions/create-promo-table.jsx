import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function PromotionForm({ open, onClose, onSubmit }) {
  const initialFormState = {
    type: '',
    discountRate: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const [formState, setFormState] = React.useState(initialFormState);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!formState.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formState.discountRate.trim()) {
      newErrors.discountRate = 'Discount rate is required';
    } else if (
      Number.isNaN(formState.discountRate) ||
      formState.discountRate < 0 ||
      formState.discountRate > 100
    ) {
      newErrors.discountRate = 'Discount rate must be a number between 0 and 100';
    }
    if (!formState.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formState.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }
    if (
      formState.startDate &&
      formState.endDate &&
      new Date(formState.startDate) > new Date(formState.endDate)
    ) {
      newErrors.startDate = 'Start date must be before end date';
    }
    if (!formState.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    // Clear the error message when user starts typing again
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      onSubmit(formState);
      setFormState(initialFormState);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Promotion</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          value={formState.type}
          onChange={handleChange}
          error={!!errors.type}
          helperText={errors.type}
        />
        <TextField
          margin="dense"
          name="discountRate"
          label="Discount Rate"
          type="text"
          fullWidth
          value={formState.discountRate}
          onChange={handleChange}
          error={!!errors.discountRate}
          helperText={errors.discountRate}
        />
        <TextField
          margin="dense"
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          value={formState.startDate}
          onChange={handleChange}
          error={!!errors.startDate}
          helperText={errors.startDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="endDate"
          label="End Date"
          type="date"
          fullWidth
          value={formState.endDate}
          onChange={handleChange}
          error={!!errors.endDate}
          helperText={errors.endDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formState.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

PromotionForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PromotionForm;
