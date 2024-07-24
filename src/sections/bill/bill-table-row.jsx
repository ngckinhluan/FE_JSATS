import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';

import Iconify from 'src/components/iconify';
import InvoicePreviewDialog from './bill-preview-dialog'; 

export default function UserTableRow({
  selected,
  billId,
  customerId,
  staffId,
  saleDate,
  totalAmount,
  handleClick,
  customerName,
  staffName
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

  const formattedDate = format(new Date(saleDate), 'dd/MM/yyyy HH:mm:ss');

  return (
    <>
      <TableRow>
        <TableCell>{billId}</TableCell>
        <TableCell>{customerName}</TableCell>
        <TableCell>{staffName}</TableCell>
        <TableCell>{totalAmount}</TableCell>
        <TableCell>{formattedDate}</TableCell>
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
  saleDate: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  customerName: PropTypes.string,
  staffName: PropTypes.string
};