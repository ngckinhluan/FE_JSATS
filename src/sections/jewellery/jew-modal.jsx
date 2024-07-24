import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faMoneyBill, faDollarSign, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export default function InfoModal({ show, handleClose, name, goldPrice, goldWeight, laborCost, jewelryPrice, gemPrice, type, barcode, imageUrl, totalPrice }) {
  return (
    <Modal size="md" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            {imageUrl && <img src={imageUrl} alt={name} style={{ width: '100%' }} />}
          </Col>
          <Col md={7}>
            <h5 className='mb-4'>{name}</h5>
            <p><FontAwesomeIcon icon={faWeightHanging} /> &nbsp; Gold Weight: {goldWeight} g</p>
            <p><FontAwesomeIcon icon={faMoneyBill} /> &nbsp; Gold Price: {goldPrice} $</p>
            <p><FontAwesomeIcon icon={faDollarSign} /> &nbsp; Labor Cost: {laborCost} $</p>
            <p><FontAwesomeIcon icon={faDollarSign} /> &nbsp; Jewelry Price: {jewelryPrice} $</p>
            <p><FontAwesomeIcon icon={faDollarSign} /> &nbsp; Gem Price: {gemPrice} $</p>
            <p><FontAwesomeIcon icon={faDollarSign} /> &nbsp; Total Price: {totalPrice} $</p>
            <p><FontAwesomeIcon icon={faBarcode} /> &nbsp; Barcode: {barcode}</p>
            <p><FontAwesomeIcon icon={faBarcode} /> &nbsp; Type: {type}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  goldWeight: PropTypes.any.isRequired,
  goldPrice: PropTypes.any.isRequired,
  laborCost: PropTypes.any.isRequired,
  jewelryPrice: PropTypes.any.isRequired,
  gemPrice: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  barcode: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  totalPrice: PropTypes.any.isRequired,
};