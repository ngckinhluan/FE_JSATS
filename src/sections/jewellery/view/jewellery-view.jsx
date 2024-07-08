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
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecord, setTotalRecord] = useState(0);

  useEffect(() => {
    getJew();
  }, []);

  const getJew = async () => {
    try {
      const url = `http://localhost:5188/api/Jewelry/GetJewelries?pageNumber=${page + 1}&pageSize=${rowsPerPage}`;
      const response = await axios.get(url);
      setJewList(response.data.data);
      setTotalRecord(response.data.totalRecord);
    } catch (error) {
      console.error('Error fetching jewellery:', error);
    }
  };

  const createJew = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5188/api/Jewelry/CreateJewelry', newItem);
      setJewList([...jewList, newItem]);
      handleClose();
      toast.success('Create successful !', {
        position: 'bottom-right',
        theme: 'colored',
      });
    } catch (error) {
      console.error('There was an error creating the item:', error);
    }
  };

  const deleteJewellery = async (id) => {
    try {
      await axios.delete(`http://localhost:5188/api/Jewelry/DeleteJewelry/${id}`);
      setJewList(jewList.filter((item) => item.jewelryId !== id));
      toast.success('Delete successful !', {
        position: 'bottom-right',
        theme: 'colored',
      });
    } catch (error) {
      console.error('There was an error deleting the item:', error);
    }
  };

  const updateJew = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5188/api/Jewelry/UpdateJewelry/${id}`, updatedData);
      setJewList((prevData) =>
        prevData.map((item) => (item.jewelryId === id ? updatedData : item))
      );
      toast.success('Update successful !', {
        position: 'bottom-right',
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error updating jewellery:', error);
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
  };

  const dataFiltered = applyFilter({
    inputData: jewList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={totalRecord}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'type', label: 'Type' },
                  { id: 'jewelryPrice', label: 'JewelryPrice' },
                  { id: 'laborCost', label: 'Labor Cost' },
                  { id: 'barcode', label: 'Barcode' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.jewelryId}
                      id={row.jewelryId}
                      name={row.name}
                      goldweight={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldQuantity : ''}
                      goldprice={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldPrice : ''}
                      goldType={row.materials && row.materials.length > 0 && row.materials[0].gold ? row.materials[0].gold.goldType : ''}
                      gemType={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gem : ''}
                      gemweight={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gemQuantity : ''}
                      gemPrice={row.materials && row.materials.length > 0 && row.materials[0].gem ? row.materials[0].gem.gemPrice : ''}
                      totalPrice={row.totalPrice}
                      type={row.type}
                      barcode={row.barcode}
                      jewelryPrice={row.totalPrice}
                      gemCost={row.gemCost}
                      laborCost={row.laborCost}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onDelete={() => deleteJewellery(row.jewelryId)}
                      onUpdate={(updatedData) => updateJew(row.jewelryId, updatedData)}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, totalRecord)}
                />
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
          rowsPerPageOptions={[5]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
