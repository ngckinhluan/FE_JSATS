import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';

function PromotionEditForm({ open, onClose, onSubmit, promotion }) {
  const [formState, setFormState] = React.useState({
    type: promotion ? promotion.type : '',
    discountRate: promotion ? promotion.discountRate : '',
    startDate: promotion.startDate ? new Date(promotion.startDate).toISOString().split('T')[0] : '',
    endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().split('T')[0] : '',
    description: promotion ? promotion.description : '',
  });

  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (promotion) {
      setFormState({
        type: promotion.type,
        discountRate: promotion.discountRate,
        startDate: promotion.startDate
          ? new Date(promotion.startDate).toISOString().split('T')[0]
          : '',
        endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().split('T')[0] : '',
        description: promotion.description,
      });
    }
  }, [promotion]);

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.type) newErrors.type = 'Type is required';
    if (!formState.discountRate) {
      newErrors.discountRate = 'Discount rate is required';
    } else if (formState.discountRate < 0 || formState.discountRate > 100 ||Number.isNaN(formState.discountRate))  {
      newErrors.discountRate = 'Discount rate cannot be negative and must be less than 100';
    }
    if (!formState.startDate) newErrors.startDate = 'Start date is required';
    if (!formState.endDate) newErrors.endDate = 'End date is required';
    if (
      formState.startDate &&
      formState.endDate &&
      new Date(formState.startDate) > new Date(formState.endDate)
    ) {
      newErrors.startDate = 'Start date must be before end date';
    }
    if (!formState.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formState);
      toast.success('Promotion updated');
      onClose();
    } else {
      toast.error('Please fix the validation errors');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Promotion</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="type"
          label="Type"
          value={formState.type}
          type="text"
          fullWidth
          onChange={handleChange}
          error={!!errors.type}
          helperText={errors.type}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="discountRate"
          label="Discount Rate"
          value={formState.discountRate}
          type="number"
          fullWidth
          onChange={handleChange}
          error={!!errors.discountRate}
          helperText={errors.discountRate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="startDate"
          label="Start Date"
          value={formState.startDate}
          type="date"
          fullWidth
          onChange={handleChange}
          error={!!errors.startDate}
          helperText={errors.startDate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="endDate"
          value={formState.endDate}
          label="End Date"
          type="date"
          fullWidth
          onChange={handleChange}
          error={!!errors.endDate}
          helperText={errors.endDate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          value={formState.description}
          type="text"
          fullWidth
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
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

PromotionEditForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  promotion: PropTypes.shape({
    promotionId: PropTypes.any,
    type: PropTypes.string,
    discountRate: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    approveManager: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default PromotionEditForm;
