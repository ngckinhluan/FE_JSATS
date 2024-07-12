import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Autocomplete, TextField, InputAdornment, FormControl } from '@mui/material';

export default function EditModal({
  show,
  handleClose,
  id,
  onUpdate,
}) {
  const [goldtype, setGoldtype] = useState([]);
  const [gemtype, setGemtype] = useState([]);
  const [jewelleryType, setJewelleryType] = useState([]);
  const [initialValues, setInitialValues] = useState({
    jewelryTypeId: null,
    name: '',
    imageUrl: '',
    jewelryMaterial: {
      gemId: null,
      goldId: null,
      goldQuantity: 50,
      gemQuantity: 50,
    },
    barcode: '',
    laborCost: '',
  });

  useEffect(() => {
    getGemPrices();
    getGoldPrices();
    getJewelleryTypes();
    if (id) {
      fetchJewelleryData(id);
    }
  }, [id]);

  const fetchJewelleryData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5188/api/Jewelry/GetJewelryById/${id}`);
      const data = response.data;
      
      const materials = data.materials && data.materials.length > 0 ? data.materials[0] : {};
  
      setInitialValues({
        jewelryTypeId: { label: data.type, value: data.jewelryTypeId }, 
        name: data.name,
        imageUrl: data.imageUrl,
        jewelryMaterial: {
          gemId: materials.gem ? { label: materials.gem.gem, value: materials.gem.gemId } : null,
          goldId: materials.gold ? { label: materials.gold.goldType, value: materials.gold.goldId } : null,
          goldQuantity: materials.gold ? materials.gold.goldQuantity : 0,
          gemQuantity: materials.gem ? materials.gem.gemQuantity : 0,
        },
        barcode: data.barcode,
        laborCost: data.laborCost,
      });
    } catch (error) {
      console.error('Error fetching jewellery data:', error);
    }
  };
  
  const getGoldPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Price/GetGoldPrices');
      const goldOptions = response.data.map((item) => ({ label: item.type, value: item.goldId }));
      setGoldtype(goldOptions);
    } catch (error) {
      console.error('Error fetching gold prices:', error);
    }
  };

  const getGemPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/Price/GetGemPrices');
      const gemOptions = response.data.map((item) => ({ label: item.type, value: item.gemId }));
      setGemtype(gemOptions);
    } catch (error) {
      console.error('Error fetching gem prices:', error);
    }
  };

  const getJewelleryTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/JewelryType/GetJewelryTypes');
      const jewelryOptions = response.data.map((item) => ({ label: item.name, value: item.jewelryTypeId }));
      setJewelleryType(jewelryOptions);
    } catch (error) {
      console.error('Error fetching jewellery types:', error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const updatedData = 
        {
          jewelryId: id,
          jewelryTypeId: values.jewelryTypeId ? values.jewelryTypeId.value : null,
          name: values.name,
          imageUrl: values.imageUrl,
          jewelryMaterial: {
            goldQuantity: values.jewelryMaterial.goldQuantity,
            gemQuantity: values.jewelryMaterial.gemQuantity,
            goldId: values.jewelryMaterial.goldId ? values.jewelryMaterial.goldId.value : null,
            gemId: values.jewelryMaterial.gemId ? values.jewelryMaterial.gemId.value : null,
          },
          barcode: values.barcode,
          laborCost: values.laborCost,
        };

        // Log dữ liệu trước khi gửi yêu cầu cập nhật
        console.log('Updated Values JSON:', JSON.stringify(updatedData, null, 2));

        onUpdate(updatedData);
        handleClose();
      } catch (error) {
        console.error('Error updating jewellery:', error);
      }
    },
  });

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Jewellery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6} className="">
              <InputGroup className="mb-4 mt-4">
                <TextField
                  label="Jewellery Name"
                  variant="outlined"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ width: 300 }}
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <TextField
                  label="Image URL"
                  variant="outlined"
                  name="imageUrl"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                  helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                  sx={{ width: 300 }}
                />
              </InputGroup>
              <InputGroup className="mb-4 mt-4 ">
                <FormControl fullWidth variant="standard">
                  <TextField
                    label="Labor Cost"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    name="laborCost"
                    value={formik.values.laborCost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ maxWidth: 300 }}
                  />
                </FormControl>
              </InputGroup>
            </Col>
            <Col md={5}>
              <InputGroup className="mb-4 mt-3 ms-5">
                <FormControl fullWidth variant="standard">
                  <TextField
                    label="Barcode"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    name="barcode"
                    value={formik.values.barcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-4 mt-3 ms-3">
                <Form.Label>Gold Weight: {formik.values.jewelryMaterial.goldQuantity} grams</Form.Label>
                <Form.Range
                  className="custom-range"
                  name="jewelryMaterial.goldQuantity"
                  min={0}
                  max={2000}
                  step={1}
                  value={formik.values.jewelryMaterial.goldQuantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: '100%' }}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-4 mt-3 ms-5">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={goldtype}
                  onChange={(event, value) => formik.setFieldValue('jewelryMaterial.goldId', value ? value : '')}
                  value={formik.values.jewelryMaterial.goldId || null}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onBlur={formik.handleBlur}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Gold Type" />}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-4 mt-3 ms-3">
                <Form.Label>Gem Weight: {formik.values.jewelryMaterial.gemQuantity} grams</Form.Label>
                <Form.Range
                  className="custom-range"
                  name="jewelryMaterial.gemQuantity"
                  min={0}
                  max={2000}
                  step={1}
                  value={formik.values.jewelryMaterial.gemQuantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: '100%' }}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-4 mt-3 ms-5">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={gemtype}
                  onChange={(event, value) => formik.setFieldValue('jewelryMaterial.gemId', value ? value : '')}
                  value={formik.values.jewelryMaterial.gemId || null}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onBlur={formik.handleBlur}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Gem Type" />}
                />
              </InputGroup>
            </Col>
            <Col md={{ span: 6, offset: 6 }}>
              <InputGroup className="mb-4 mt-3 ms-5">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={jewelleryType}
                  onChange={(event, value) => formik.setFieldValue('jewelryTypeId', value ? value : '')}
                  value={formik.values.jewelryTypeId || null}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onBlur={formik.handleBlur}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Type" />}
                />
              </InputGroup>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};