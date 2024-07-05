import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';


import Iconify from 'src/components/iconify';
import InvoicePreviewDialog from './bill-preview-dialog'; // Adjust the path as needed

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  billId,
  customerId,
  staffId,
  saleDate,
  totalAmount,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{billId}</TableCell>

        <TableCell>{customerId}</TableCell>

        <TableCell>{staffId}</TableCell>

        <TableCell>{totalAmount}</TableCell>

        <TableCell>{saleDate}</TableCell>

        <TableCell align="right">
          <Button variant="outlined" onClick={handleDialogOpen}>
            More Info
          </Button>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <InvoicePreviewDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        billId={billId.toString()}
      />
    </>
  );
}

UserTableRow.propTypes = {
  billId: PropTypes.number,
  customerId: PropTypes.number,
  staffId: PropTypes.number,
  totalAmount: PropTypes.number,
  saleDate: PropTypes.instanceOf(Date),
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
