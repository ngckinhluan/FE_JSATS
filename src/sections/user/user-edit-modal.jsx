import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col, Modal, Button } from 'react-bootstrap';


import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function EditModal({ show, handleClose, fullName, roleId, email, password,gender, onUpdate }) {


    const [formData, setFormData] = useState({
        fullName,
        roleId,
        email,
        password,
        gender

    });
    useEffect(() => {
        setFormData({
            fullName,
            roleId,
            email,
            password,
            gender
        });
    }, [fullName, roleId, email, password,gender]);
    console.log(gender)



    const handleChange = (e) => {
        const { name: inputName, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [inputName]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(formData);
        handleClose();

    };

    return (
        <>
            <style type="text/css">
                {`
          .custom-range::-webkit-slider-runnable-track {
            background: gray; /* Black track */
          }

          .custom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: blue; /*  thumb */
            cursor: pointer;
            border-radius: 50%;
            margin-top: -4px; /* Adjust based on thumb height */
          }
          
        `}
            </style>
            <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="me-5 ms-3"  >
                                <InputGroup className="mb-4 mt-4">
                                    <TextField id="fullWidth" label="fullName" variant="outlined" name='fullName' value={formData.fullName} required onChange={handleChange} sx={{
                                        width: 300,

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray', // sets the border color
                                            },
                                        }
                                    }
                                    } />
                                </InputGroup>

                                <InputGroup className="mb-4 mt-4">
                                    <TextField id="fullWidth" label="Password" variant="outlined" name='password' required value={formData.password} onChange={handleChange} sx={{
                                        width: 300,

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray', // sets the border color
                                            },
                                        }
                                    }
                                    } />
                                </InputGroup>

                                <InputGroup className="mb-4 mt-4">
                                    <TextField id="fullWidth" label="Email" variant="outlined" name='email' value={formData.email} onChange={handleChange} sx={{
                                        width: 300,

                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray', // sets the border color
                                            },
                                        }
                                    }
                                    } />
                                </InputGroup>

                            </Col>

                            <Col md={6}>
                                <InputGroup className="mb-4 mt-3 ms-5">
                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name='roleId'
                                            value={formData.roleId}
                                            onChange={handleChange}
                                            style={{ flexDirection: 'row' }}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Admin" />
                                            <FormControlLabel value="2" control={<Radio />} label="Manager" />
                                            <FormControlLabel value="3" control={<Radio />} label="Staff" />
                                        </RadioGroup>
                                    </FormControl>
                                </InputGroup>
                            </Col>
                            <Col md={12}>
                                <InputGroup className="mb-4 mt-3 ms-5">
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}

                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </InputGroup>
                            </Col>

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>

                </Modal.Footer>

            </Modal>

        </>
    );
}

EditModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    fullName: PropTypes.string.isRequired,
    password: PropTypes.any.isRequired,
    email: PropTypes.any.isRequired,
    roleId: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    gender: PropTypes

};