import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Grid, Button, Dialog, Typography ,DialogTitle, DialogContent ,DialogActions } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import StaffEditForm from './staff-edit-modal';
import StaffDeleteForm from './staff-del-modal';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  staffId,
  userName,
  email,
  password,
  roleId,
  counterId,
  handleClick,
  status,
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

        <TableCell>{userName}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{password}</TableCell>
        <TableCell>{roleId}</TableCell>
        <TableCell>
          <Label color={(status === 'inactive' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align='right'>
          <Button variant="outlined" onClick={handleDialogOpen}>
            More Info
          </Button>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Staff</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">ID:</Typography>
              <Typography>{staffId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">User Name:</Typography>
              <Typography>{userName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Counter ID:</Typography>
              <Typography>{counterId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Password:</Typography>
              <Typography>{password}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Role ID:</Typography>
              <Typography>{roleId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Status:</Typography>
              <Typography><Label color={(status === 'inactive' && 'error') || 'success'}>{status}</Label></Typography>
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

      <StaffEditForm
        open={editOpen}
        onClose={handleEditClose}
        staff={{
          staffId,
          userName,
          email,
          password,
          roleId,
          counterId,
          status
        }}
        onSubmit={onSubmit}
      />

      <StaffDeleteForm
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={onDelete}
        staff={{
          staffId,
          userName,
          email,
          password,
          roleId,
          counterId,
          status
        }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  staffId: PropTypes.string,
  userName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  handleClick: PropTypes.func,
  roleId: PropTypes.string,
  counterId: PropTypes.number,
  selected: PropTypes.any,
  status: PropTypes.string,
};
