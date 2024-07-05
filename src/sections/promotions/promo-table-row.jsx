import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';
import PromotionEditForm from './promo-edit-modal';
import PromotionDeleteForm from './promo-del-modal';

export default function UserTableRow({
  selected,
  promotionId,
  type,
  description,
  discountRate,
  startDate,
  endDate,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const onSubmit = async (updatedData) => {
    try {
      const formattedData = {
        ...updatedData,
        startDate: new Date(updatedData.startDate).toISOString(),
        endDate: new Date(updatedData.endDate).toISOString(),
      };

      console.log('Sending PUT request with data:', formattedData);

      const res = await axios.put(
        `http://localhost:5188/api/Promotion/UpdatePromotion?id=${promotionId}`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        toast.success('Edit promotion success');
        window.location.reload(); // Refresh the page after successful edit (you might want to use a more sophisticated approach like updating state if you prefer)
      } else {
        toast.error('Edit promotion fail');
      }
      handleEditClose();
    } catch (error) {
      console.error(
        'Error updating promotion:',
        error.response ? error.response.data : error.message
      );
      toast.error('Error updating promotion');
    }
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    handleCloseMenu();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    handleCloseMenu();
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5188/api/Promotion/DeletePromotion?id=${promotionId}`
      );
      if (res.data === 1) {
        toast.success('Delete success');
        window.location.reload(); // Refresh the page after successful delete (you might want to use a more sophisticated approach like updating state if you prefer)
      } else {
        toast.error('Delete fail');
      }
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      toast.error('Error deleting promotion');
    }
  };

  const formattedStartDate = startDate ? format(new Date(startDate), 'dd/MM/yyyy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'dd/MM/yyyy') : '';

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{promotionId}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell style={{width:"100px"}}>{description}</TableCell>
        <TableCell style={{ position: "absolute", marginLeft:"25px", marginTop:"10px", width:"10px" }}>{`${discountRate}%`}</TableCell>
        <TableCell>{formattedStartDate}</TableCell>
        <TableCell>{formattedEndDate}</TableCell>
        <TableCell align="right">
          <Button variant="outlined" onClick={handleDialogOpen}>
            More Info
          </Button>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Promotion</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Promotion ID:</Typography>
              <Typography>{promotionId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Type:</Typography>
              <Typography>{type}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Discount Rate:</Typography>
              <Typography>{`${discountRate}%`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Start Date:</Typography>
              <Typography>{startDate}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>{endDate}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Description:</Typography>
              <Typography>{description}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteOpen} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <PromotionEditForm
        open={editOpen}
        onClose={handleEditClose}
        promotion={{
          promotionId,
          type,
          discountRate,
          startDate,
          endDate,
          description,
        }}
        onSubmit={onSubmit}
      />

      <PromotionDeleteForm
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={onDelete}
        promotion={{
          promotionId,
          type,
          discountRate,
          startDate,
          endDate,
          description,
        }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  promotionId: PropTypes.any,
  type: PropTypes.string,
  description: PropTypes.string,
  handleClick: PropTypes.func,
  discountRate: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  selected: PropTypes.any,
};
