import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function GoldpriceTableRow({
  city,
  buyPrice,
  sellPrice,
  type,
  lastUpdated,
  handleClick,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} onClick={handleClick}>
       <TableCell>{type}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{buyPrice}</TableCell>
        <TableCell>{sellPrice}</TableCell>     
        <TableCell>{new Date(lastUpdated).toLocaleString()}</TableCell>
        <TableCell align='right'>
          <Button variant="outlined" onClick={handleDialogOpen}>
            More Info
          </Button>
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Gold Price Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">City:</Typography>
              <Typography>{city}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Buy Price:</Typography>
              <Typography>{buyPrice}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Sell Price:</Typography>
              <Typography>{sellPrice}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Type:</Typography>
              <Typography>{type}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Last Updated:</Typography>
              <Typography>{new Date(lastUpdated).toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

GoldpriceTableRow.propTypes = {
  city: PropTypes.string.isRequired,
  buyPrice: PropTypes.string.isRequired,
  sellPrice: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  lastUpdated: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  handleClick: PropTypes.func.isRequired,
};
