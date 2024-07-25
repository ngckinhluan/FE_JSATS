import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

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

import CustomerEditForm from './customer-edit-model';
import CustomerDeleteForm from './customer-del-model';

export default function UserTableRow({
  selected,
  customerId,
  userName,
  fullName,
  email,
  phone,
  gender,
  address,
  point,
  handleClick,
  refreshCustomerList,
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

  const onupdateSubmit = async (updatedData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5188/api/Customer/UpdateCustomer/${updatedData.customerId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleEditClose();
        toast.success('Update successful!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: { backgroundColor: 'green' }
        });
        refreshCustomerList();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error updating customer!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        style: { backgroundColor: 'red' }
      });
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

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://localhost:5188/api/Customer/DeleteCustomer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleDeleteClose();
        toast.success('Delete successful!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: { backgroundColor: 'green' }
        });
        refreshCustomerList();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        style: { backgroundColor: 'red' }
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{fullName}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell>{point}</TableCell>

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
        <DialogTitle>Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">User Name:</Typography>
              <Typography>{userName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Full Name:</Typography>
              <Typography>{fullName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address:</Typography>
              <Typography>{address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Phone Number:</Typography>
              <Typography>{phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Point:</Typography>
              <Typography>{point}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Gender:</Typography>
              <Typography>{gender}</Typography>
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

      <CustomerEditForm
        open={editOpen}
        onClose={handleEditClose}
        customer={{
          customerId,
          userName,
          fullName,
          email,
          phone,
          gender,
          address,
          point,
        }}
        onSubmit={onupdateSubmit}
      />

      <CustomerDeleteForm
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleDelete}
        customer={{ customerId, fullName, userName, address, phone, point, gender }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  customerId: PropTypes.any,
  userName: PropTypes.any,
  fullName: PropTypes.any,
  address: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  point: PropTypes.any,
  gender: PropTypes.any,
  phone: PropTypes.any,
  selected: PropTypes.any,
  refreshCustomerList: PropTypes.func.isRequired,
};
