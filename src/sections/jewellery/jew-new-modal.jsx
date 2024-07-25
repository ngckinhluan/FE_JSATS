import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { CloudinaryContext, Image } from 'cloudinary-react';

export default function NewModal({ show, handleClose, createJew }) {
    const [goldtype, setGoldtype] = useState([]);
    const [gemtype, setGemtype] = useState([]);
    const [jewelleryType, setJewelleryType] = useState([]);

    const formik = useFormik({
        initialValues: {
            jewelryTypeId: '',
            name: '',
            imageUrl: '',
            jewelryMaterial: {
                gemId: '',
                goldId: '',
                goldQuantity: 50,
                gemQuantity: 50
            },
            barcode: '',
            laborCost: ''
        },
        onSubmit: (values) => {
            createJew(values);
            formik.resetForm();
            handleClose();
        },
    });

    useEffect(() => {
        getGemPrices();
        getGoldPrices();
        getJewelleryTypes();
    }, []);

   const getGoldPrices = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5188/api/Price/GetGoldPrices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const goldOptions = response.data.map((item) => ({ label: item.type, value: item.goldId }));
            setGoldtype(goldOptions);
        } catch (error) {
            console.error('Error fetching gold prices:', error);
        }
    };

    const getGemPrices = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5188/api/Price/GetGemPrices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const gemOptions = response.data.map((item) => ({ label: item.type, value: item.gemId }));
            setGemtype(gemOptions);
        } catch (error) {
            console.error('Error fetching gem prices:', error);
        }
    };

    const getJewelleryTypes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5188/api/JewelryType/GetJewelryTypes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const jewelryOptions = response.data.map((item) => ({ label: item.name, value: item.jewelryTypeId }));
            setJewelleryType(jewelryOptions);
        } catch (error) {
            console.error('Error fetching jewellery types:', error);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.currentTarget.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'JSATS_v1'); 
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dkfag0frg/image/upload`,
                formData
            );
            formik.setFieldValue('imageUrl', response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <CloudinaryContext cloudName="dkfag0frg">
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Jewellery</Modal.Title>
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
                                        sx={{
                                            width: 300,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gray',
                                                },
                                            },
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <TextField
                                        type="file"
                                        name="imageFile"
                                        onChange={handleImageUpload}
                                        onBlur={formik.handleBlur}
                                        sx={{
                                            width: 300,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gray',
                                                },
                                            },
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-4 mt-4 ">
                                    <FormControl fullWidth variant="standard">
                                        <TextField
                                            label="LaborCost"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">VND</InputAdornment>,
                                            }}
                                            name="laborCost"
                                            value={formik.values.laborCost}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            sx={{
                                                maxWidth: 300,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'gray',
                                                    },
                                                },
                                            }}
                                        />
                                    </FormControl>
                                </InputGroup>
                            </Col>
                            <Col md={5}>
                                <InputGroup className="mb-4 mt-3 ms-5">
                                    <FormControl fullWidth variant="standard">
                                        <TextField
                                            label="BarCost"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
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
                                    <Form.Label>GoldWeight: {formik.values.jewelryMaterial.goldQuantity} grams</Form.Label>
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
                                        onChange={(event, value) => formik.setFieldValue('jewelryMaterial.goldId', value ? value.value : '')}
                                        value={goldtype.find(option => option.value === formik.values.jewelryMaterial.goldId) || null}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="GoldType" />}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="mb-4 mt-3 ms-3">
                                    <Form.Label>GemWeight: {formik.values.jewelryMaterial.gemQuantity} grams</Form.Label>
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
                                        onChange={(event, value) => formik.setFieldValue('jewelryMaterial.gemId', value ? value.value : '')}
                                        value={gemtype.find(option => option.value === formik.values.jewelryMaterial.gemId) || null}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="GemType" />}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={{ span: 6, offset: 6 }}>
                                <InputGroup className="mb-4 mt-3 ms-5">
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={jewelleryType}
                                        onChange={(event, value) => formik.setFieldValue('jewelryTypeId', value ? value.value : '')}
                                        value={jewelleryType.find(option => option.value === formik.values.jewelryTypeId) || null}
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
                                Add
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </CloudinaryContext>
    );
}

NewModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    createJew: PropTypes.func.isRequired,
};
