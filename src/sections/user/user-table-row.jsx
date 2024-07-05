import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import InfoModal from './user-modal';
import DelModal from './user-del-modal';
import EditModal from './user-edit-modal';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  fullName,
  role,
  email,
  handleClick,
  roleId,
  password,
  onDelete,
  onUpdate,
  gender,

}) {
  console.log("id",id)

  const [open, setOpen] = useState(null);
  const [showDel, setShowDel] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  const [showEd, setShowEd] = useState(false);

  const handleCloseEd = () => setShowEd(false);
  const handleShowEd = () => setShowEd(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {fullName}
            </Typography>
          </Stack>
        </TableCell>

      

        <TableCell>{email}</TableCell>

        <TableCell>
          <Label color={(role === 'Admin' && 'primary') || (role === 'Staff' && 'secondary') || 'success'}>{role}</Label>
        </TableCell>

        <TableCell align="right">
        <Button variant="outline-primary" onClick={handleShow}>More Info</Button>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
        <MenuItem onClick={() => { handleCloseMenu(); handleShowEd(); }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => { handleCloseMenu(); handleShowDel(); }} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <DelModal show={showDel} handleClose={handleCloseDel} fullName={fullName} roleId={roleId}  email={email} password={password} onDelete={onDelete} role={role}/>

      <InfoModal show={show} handleClose={handleClose} fullName={fullName} roleId={roleId}  email={email} password={password} role={role} />

      <EditModal show={showEd} handleClose={handleCloseEd}  fullName={fullName} roleId={roleId} email={email} password={password} role={role} gender={gender}  onUpdate={(updatedData) => onUpdate(id, updatedData)} />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  roleId: PropTypes.any,
  handleClick: PropTypes.func,
  email: PropTypes.any,
  role: PropTypes.string,
  fullName: PropTypes.any,
  selected: PropTypes.any,
  password: PropTypes.any,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  gender: PropTypes.string
};
