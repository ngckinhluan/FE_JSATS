import axios from 'axios';
import { toast } from 'react-toastify';
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

// import { fetchAllUsers } from "src/_mock/user";

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import NewModal from '../user-new-modal';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userList, setUserList] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  console.log("filterName",filterName)
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    const res = await axios.get("http://localhost:5188/api/User/GetUsers");
    console.log("res",res);
    setUserList(res.data);
  }

  console.log(userList)

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5188/api/User/DeleteUser/${id}`);
      setUserList(userList.filter((item) => item.id !== id));
      toast.success('Delete user successful !', {
        position: "bottom-right",
        theme: "colored",
      });

      console.log('Delete successful');
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const createUser = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5188/api/User/AddUser', newItem);
      // setUserList([...userList, response.data]);
      handleClose();
      toast.success('Create user successful !', {
        position: "bottom-right",
        theme: "colored",
      });
      getUser();
    } catch (error) {
      console.error('There was an error creating:', error);
    }
  }


  const updateUser = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5188/api/User/UpdateUser/${id}`, updatedData);
      const updatedUser = response.data;
      setUserList(prevData =>
        prevData.map(item => (item.id === id ? updatedUser : item))
      );
      toast.success('Update user successful !', {
        position: "bottom-right",
        theme: "colored",
      });
  
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((user) => user.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShow}>
          New User
        </Button>
        <NewModal show={show} handleClose={handleClose} createUser={createUser} />
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
                rowCount={userList.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'name' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserTableRow
                      key={user.userId}
                      id={user.userId}
                      password={user.password}
                      fullName={user.fullName}
                      email={user.email}
                      role={user.role.roleName}
                      roleId={user.role.roleId}
                      selected={selected.indexOf(user.id) !== -1}
                      handleClick={(event) => handleClick(event, user.id)}
                      onDelete={() => deleteUser(user.userId)} 
                      onUpdate={updateUser}
                      gender={user.gender}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
