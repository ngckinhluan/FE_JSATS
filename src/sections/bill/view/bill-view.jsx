import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../bill-table-row';
import UserTableHead from '../bill-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../bill-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import InvoiceTemplate from '../bill-form';

export default function BillPage() {
  const [bill, setBill] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc'); 
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('saleDate'); 
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showBillForm, setShowBillForm] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBillData = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ local storage
      setLoading(true);
      console.log(`Fetching data for page: ${page + 1}, rows per page: ${rowsPerPage}`);
      try {
        const response = await fetch(`http://localhost:5188/api/Bill/GetBills`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Bao gồm token trong header Authorization
          }
        });
        const data = await response.json();
        console.log('Data received:', data);
        setBill(data.data);
        setTotalCount(data.totalRecord);
      } catch (error) {
        console.error('Error fetching bill data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillData();
  }, [page, rowsPerPage]); // Thêm page và rowsPerPage vào dependencies để fetch dữ liệu khi trang hoặc số dòng thay đổi

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bill.map((n) => n.billId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, billId) => {
    const selectedIndex = selected.indexOf(billId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, billId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const dataFiltered = applyFilter({
    inputData: bill,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataPaginated = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const notFound = !dataFiltered.length && !!filterName;

  const handleCloseBillForm = () => {
    setShowBillForm(false);
  };

  const handleNewBillClick = (newBillData) => {
    console.log('Adding new bill:', newBillData);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bill</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={bill.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'billId', label: 'BillId' },
                  { id: 'customerName', label: 'Customer Name' },
                  { id: 'staffName', label: 'Staff Name' },
                  { id: 'totalAmount', label: 'TotalAmount' },
                  { id: 'saleDate', label: 'SaleDate' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {loading ? (
                  <tr><td colSpan={6}><Typography>Loading...</Typography></td></tr>
                ) : (
                  dataPaginated.map((row) => (
                    <UserTableRow
                      key={row.billId}
                      billId={row.billId}
                      staffName={row.staffName}
                      customerName={row.customerName}
                      totalAmount={row.totalAmount}
                      saleDate={row.saleDate}
                      selected={selected.indexOf(row.billId) !== -1}
                      handleClick={(event) => handleClick(event, row.billId)}
                    />
                  ))
                )}

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
