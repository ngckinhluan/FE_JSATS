import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NewModal from '../jew-new-modal';
import TableNoData from '../table-no-data';
import UserTableRow from '../jew-table-row';
import UserTableHead from '../jew-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../jew-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function JewelleryView() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [jewList, setJewList] = useState([]);
  const [fullJewList, setFullJewList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecord, setTotalRecord] = useState(0);
  const [jewTypes, setJewTypes] = useState([]);

  useEffect(() => {
    getJew();
    getJewTypes();
  }, [page, rowsPerPage, filterName, filterType]);

  const getJew = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Jewelry/GetJewelries', {
        params: { pageNumber: page + 1, pageSize: rowsPerPage, filterName, filterType }
      });
      const { data, totalRecord } = response.data;
      setJewList(data);
      setTotalRecord(totalRecord);
    } catch (error) {
      console.error('Error fetching jewellery:', error);
    }
  };

  const getAllJew = async () => {
    try {
      const totalResponse = await axios.get('http://localhost:5188/api/Jewelry/GetJewelries', {
        params: { pageNumber: 1, pageSize: 1, filterName: '', filterType: '' }
      });
      const totalRecords = totalResponse.data.totalRecord;

      const response = await axios.get('http://localhost:5188/api/Jewelry/GetJewelries', {
        params: { pageNumber: 1, pageSize: totalRecords, filterName: '', filterType: '' }
      });
      setFullJewList(response.data.data);
    } catch (error) {
      console.error('Error fetching all jewellery:', error);
    }
  };

  useEffect(() => {
    getAllJew();
  }, []);

  const getJewTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/JewelryType/GetJewelryTypes');
      setJewTypes(response.data);
    } catch (error) {
      console.error('Error fetching jewelry types:', error);
    }
  };

  const createJew = async (newItem) => {
    try {
        const response = await axios.post('http://localhost:5188/api/Jewelry/CreateJewelry', newItem);
        toast.success('Create successful!', {
            position: 'bottom-right',
            theme: 'colored',
        });
        handleClose();
        getJew(); // Gọi hàm getJew để làm mới lại danh sách
        getAllJew(); // Làm mới danh sách đầy đủ
    } catch (error) {
        console.error('There was an error creating the item:', error);
    }
  };

  const deleteJewellery = async (id) => {
    try {
      await axios.delete(`http://localhost:5188/api/Jewelry/DeleteJewelry/${id}`);
      setJewList(jewList.filter((item) => item.jewelryId !== id));
      setFullJewList(fullJewList.filter((item) => item.jewelryId !== id));
      toast.success('Delete successful!', {
        position: 'bottom-right',
        theme: 'colored',
      });
    } catch (error) {
      console.error('There was an error deleting the item:', error);
    }
  };

  const updateJew = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5188/api/Jewelry/UpdateJewelry/${updatedData.jewelryId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setJewList((prevData) =>
        prevData.map((item) =>
          item.jewelryId === updatedData.jewelryId ? { ...item, ...updatedData } : item
        )
      );
      setFullJewList((prevData) =>
        prevData.map((item) =>
          item.jewelryId === updatedData.jewelryId ? { ...item, ...updatedData } : item
        )
      );
      toast.success('Update successful!', {
        position: 'bottom-right',
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error updating jewellery:', error);
      toast.error('Error updating jewellery!', {
        position: 'bottom-right',
        theme: 'colored',
      });
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = jewList.map((n) => n.name);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleFilterByType = (event) => {
    console.log("Filter Type:", event.target.value);
    setFilterType(event.target.value);
    setPage(0);
  };
  console.log('filterType:', filterType);
  console.log('jewList:', jewList); 

  const dataFiltered = applyFilter({
    inputData: fullJewList,
    comparator: getComparator(order, orderBy),
    filterName,
    filterType,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const totalRecords = filterType ? dataFiltered.length : totalRecord;

  const paginatedData = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Jewellery</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShow}>
          New Jewellery
        </Button>
        <NewModal show={show} handleClose={handleClose} createJew={createJew} />
      </Stack>
  
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          filterType={filterType}
          onFilterName={handleFilterByName}
          onFilterType={handleFilterByType}
          jewTypes={jewTypes}
        />
  
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={totalRecords}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'type', label: 'Type' },
                  { id: 'jewelryPrice', label: 'Jewelry Price' },
                  { id: 'laborCost', label: 'Labor Cost' },
                  { id: 'barcode', label: 'Barcode' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {paginatedData.map((row) => (
                  <UserTableRow
                    key={row.jewelryId}
                    id={row.jewelryId}
                    name={row.name}
                    imageUrl={row.imageUrl}
                    goldWeight={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldQuantity : ''}
                    goldPrice={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldPrice : ''}
                    goldType={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldType : ''}
                    goldTypeId={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldTypeId : null}
                    gemType={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gem : ''}
                    gemTypeId={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gemTypeId : null}
                    gemWeight={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gemQuantity : ''}
                    gemPrice={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gemPrice : ''}
                    totalPrice={row.totalPrice}
                    type={row.type}
                    typeId={row.type ? row.type.typeId : null} 
                    barcode={row.barcode}
                    jewelryPrice={row.totalPrice}
                    gemCost={row.gemCost}
                    laborCost={row.laborCost}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    onDelete={() => deleteJewellery(row.jewelryId)}
                    onUpdate={updateJew}
                  />                
                ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, totalRecords)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
  
        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
