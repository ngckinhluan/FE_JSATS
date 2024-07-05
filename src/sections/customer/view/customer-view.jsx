import axios from 'axios';
import { useState, useEffect } from 'react';
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
import UserTableRow from '../customer-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableHead from '../customer-table-head';
import CustomerForm from '../create-customer-table';
import UserTableToolbar from '../customer-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function CustomerPage() {
  const [customer, setCustomer] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);

  useEffect(() => {
    getCustomer();
  }, [page, rowsPerPage, filterName]);

  const getCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5188/api/Customer/GetCustomers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const { data } = response.data;

      setCustomer(data);
      setTotalPage(response.data.totalPage);
      setTotalRecord(response.data.totalRecord);
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
      const newSelecteds = customer.map((n) => n.fullName);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setPageNumber(newPage + 1); // API pagination starts from 1
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(1);
    setPageSize(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
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
    // Example post request, adjust as per your API endpoint
    axios.post("http://localhost:5188/api/Customer/CreateCustomer", newCustomerData)
      .then(() => {
        setShowCustomerForm(false);
        // Refresh data after successful creation
        getCustomer();
      })
      .catch(error => console.error('Error creating customer:', error));
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
        <UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                  { id: '', label: '' }, // Adjust for your action column
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.customerId}
                      CusID={row.customerId}
                      name={row.fullName}
                      phoneNumber={row.phone}
                      address={row.address}
                      point={row.point}
                      gender={row.gender}
                      selected={selected.indexOf(row.fullName) !== -1}
                      handleClick={(event) => handleClick(event, row.fullName)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, customer.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalRecord}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
