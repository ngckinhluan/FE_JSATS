import { useState } from 'react';
import PropTypes from 'prop-types';

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


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  CusID,
  name,
  address,
  phoneNumber,
  point,
  gender,
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

  const onSubmit = (updatedData) => {
    handleEditClose();
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    handleCloseMenu();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    handleCloseMenu();
  };

  const onDelete = () => {
    handleDeleteClose();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell> {point} </TableCell>

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
              <Typography variant="h6">Name:</Typography>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address:</Typography>
              <Typography>{address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Phone Number:</Typography>
              <Typography>{phoneNumber}</Typography>
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
          <Button onClick={handleDialogClose}>
            Close
          </Button>
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
        customer={{ CusID, name, address, phoneNumber, point, gender, }}
        onSubmit={onSubmit}
      />

      <CustomerDeleteForm
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={onDelete}
        customer={{ CusID, name, address, phoneNumber, point, gender, }}
      />

    </>
  );
}

UserTableRow.propTypes = {
  CusID: PropTypes.any,
  gender: PropTypes.any,
  address: PropTypes.any,
  handleClick: PropTypes.func,
  point: PropTypes.any,
  name: PropTypes.any,
  phoneNumber: PropTypes.any,
  selected: PropTypes.any,
};
