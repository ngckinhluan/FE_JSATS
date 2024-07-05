import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Table,
  Dialog,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Print as PrintIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';

// CSS for print media query
const styles = `
  @media print {
    .no-print {
      display: none;
    }
  }
`;

const InvoicePreviewDialog = ({ open, onClose, billId }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    if (open) {
      axios.get(`http://localhost:5188/api/Bill/GetBillById/${billId}`)
        .then(response => {
          setInvoiceData(response.data);
        })
        .catch(error => console.error('Error fetching invoice data:', error));
    }
  }, [open, billId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  if (!invoiceData) return null;

  // const calculateDiscount = () => {  
  //   return invoiceData.totalAmount  (invoiceData.totalDiscount / 100);
  // };

  return (
    <>
      <style>{styles}</style>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle id="invoiceTitle">Invoice :   {invoiceData.billId} </DialogTitle>
        <DialogContent id='invoiceCapture'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Customer Name:</Typography>
              <Typography>{invoiceData.customerName}</Typography>
              <Typography variant="h6">Staff Name:</Typography>
              <Typography>{invoiceData.staffName}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginY: 2 }} />
              <Grid container justifyContent="flex-end">
                <Grid item xs={4}>
                  <Typography variant="h6" align="right">Total Amount:</Typography>
                  <Typography align="right">${invoiceData.totalAmount.toFixed(2)}</Typography>
                  <Typography variant="h6" align="right">Discount:</Typography>
                  <Typography align="right">${invoiceData.totalDiscount.toFixed(2)}</Typography>
                  <Typography variant="h6" align="right">Final Amount:</Typography>
                  <Typography align="right">${invoiceData.finalAmount.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="no-print">
          <Button onClick={handlePrint} startIcon={<PrintIcon />}>Print</Button>
          <Button onClick={handleDownload} startIcon={<GetAppIcon />}>Download</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

InvoicePreviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  billId: PropTypes.string.isRequired,
};

export default InvoicePreviewDialog;
