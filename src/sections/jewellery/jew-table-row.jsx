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

import Iconify from 'src/components/iconify';

import InfoModal from './jew-modal';
import DelModal from './jew-del-modal';
import EditModal from './jew-edit-modal';

export default function UserTableRow({
  id,
  selected,
  name,
  goldWeight,
  goldPrice,
  laborCost,
  handleClick,
  onDelete,
  onUpdate,
  barcode,
  jewelryPrice,
  goldType,
  gemType,
  gemWeight,
  gemPrice,
  imageUrl,
  totalPrice,
  type,
}) {
  const [open, setOpen] = useState(null);
  const [showDel, setShowDel] = useState(false);
  const [showEd, setShowEd] = useState(false);
  const [show, setShow] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  const handleCloseEd = () => setShowEd(false);
  const handleShowEd = () => setShowEd(true);

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
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{type}</TableCell>

        <TableCell>{jewelryPrice}$</TableCell>

        <TableCell>{laborCost}$</TableCell>

        <TableCell>
          {barcode}
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

      <InfoModal show={show} handleClose={handleClose} name={name} type={type} goldPrice={goldPrice} goldWeight={goldWeight} laborCost={laborCost} goldType={goldType} gemType={gemType} gemWeight={gemWeight} gemPrice={gemPrice} jewelryPrice={jewelryPrice} barcode={barcode} totalPrice={totalPrice} imageUrl={imageUrl} />

      <DelModal show={showDel} handleClose={handleCloseDel} name={name} goldPrice={goldPrice} goldWeight={goldWeight} laborCost={laborCost} type={type} barcode={barcode} imageUrl={imageUrl} totalPrice={totalPrice} jewelryPrice={jewelryPrice} gemPrice={gemPrice} onDelete={() => onDelete(id)} />

      <EditModal show={showEd} handleClose={handleCloseEd} id={id} onUpdate={onUpdate} />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  goldPrice: PropTypes.any,
  handleClick: PropTypes.func,
  laborCost: PropTypes.any,
  name: PropTypes.any,
  goldWeight: PropTypes.any,
  selected: PropTypes.any,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  barcode: PropTypes.string,
  jewelryPrice: PropTypes.number,
  goldType: PropTypes.string,
  gemType: PropTypes.string,
  gemWeight: PropTypes.number,
  gemPrice: PropTypes.number,
  totalPrice: PropTypes.number,
  type: PropTypes.string,
  imageUrl: PropTypes.string,
};