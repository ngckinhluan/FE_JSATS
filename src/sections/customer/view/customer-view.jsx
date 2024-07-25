import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Stack, Table, Button, Container, TableBody, Typography, TableContainer, TablePagination } from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../customer-table-row';
import UserTableHead from '../customer-table-head';
import CustomerForm from '../create-customer-table';
import UserTableToolbar from '../customer-table-toolbar';
import { applyFilter, getComparator } from '../utils';

export default function CustomerPage() {
  const [customer, setCustomer] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('fullName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);

  useEffect(() => {
    getCustomer();
  }, [pageNumber, pageSize, filterName]);

  const getCustomer = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5188/api/Customer/GetCustomers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { pageNumber, pageSize, filterName }
      });
      const { data, totalPage, totalRecord } = response.data;
      setCustomer(data);
      setTotalPage(totalPage);
      setTotalRecord(totalRecord);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customer.map((n) => n.customerId);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setRowsPerPage(newPageSize);
    setPageSize(newPageSize);
    setPage(0);
    setPageNumber(1);
  };

  const handleFilterByName = (name) => {
    setFilterName(name);
    setPage(0);
    setPageNumber(1);
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selected.map(customerId =>
          axios.delete(`http://localhost:5188/api/Customer/DeleteCustomer/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
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
      setSelected([]);
      getCustomer();
    } catch (error) {
      console.error('Error deleting customers:', error);
      toast.error('Error deleting customers!', {
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

  const dataFiltered = applyFilter({
    inputData: customer,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleCloseCustomerForm = () => {
    setShowCustomerForm(false);
  };

  const handleNewCustomerClick = (newCustomerData) => {
    const token = localStorage.getItem('token');
    axios.post("http://localhost:5188/api/Customer/CreateCustomer", newCustomerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setShowCustomerForm(false);
        getCustomer();
        toast.success('Create successful!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: { backgroundColor: 'green' }
        });
      })
      .catch(error => {
        console.error('Error creating customer:', error);
        toast.error('Error creating customer!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          style: { backgroundColor: 'red' }
        });
      });
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Customers</Typography>
        <Button
          onClick={() => setShowCustomerForm(true)}
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Customer
        </Button>
      </Stack>

      <CustomerForm open={showCustomerForm} onClose={handleCloseCustomerForm} onSubmit={handleNewCustomerClick} />

      <Card>
        <UserTableToolbar 
          numSelected={selected.length} 
          filterName={filterName} 
          onFilterName={handleFilterByName} 
          onDeleteSelected={handleDeleteSelected} 
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={customer.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'fullName', label: 'Name' },
                  { id: 'address', label: 'Address' },
                  { id: 'phone', label: 'Phone Number' },
                  { id: 'point', label: 'Point' },
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((row, index) => (
                  <UserTableRow
                    key={row.customerId || index}
                    customerId={row.customerId}
                    userName={row.userName}
                    email={row.email}
                    fullName={row.fullName}
                    phone={row.phone}
                    address={row.address}
                    point={row.point}
                    gender={row.gender}
                    selected={selected.indexOf(row.customerId) !== -1}
                    handleClick={(event) => handleClick(event, row.customerId)}
                    refreshCustomerList={getCustomer}
                  />
                ))}
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          count={totalRecord}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 100]}
        />
      </Card>
    </Container>
  );
}
