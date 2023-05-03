import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { axiosInstance } from '../Auth/Authprovide';

export default function OfferFormPop({ show, onClose, carId }) {
    const [formData, setFormData] = useState(
        {
            offer: '',
            remarks: '',
        }
    );

    const notifySuccess = () => {
        toast.success('Offer Added!', {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        });
    }

    const notifyFail = (e) => {
        toast.error(e, {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance
            .post('https://localhost:7013/postoffer', {
                discountPercentage: formData.offer,
                remarks: formData.remarks,
                carId: carId
            })
            .then((response) => {
                notifySuccess();
                onClose();
            })
            .catch((error) => {
                console.log(error);
                notifyFail(error);
            });
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Offer Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3 needs-validation">
                    <div className="col-md-12">
                        <label className="form-label">Offer %</label>
                        <input
                            type="int"
                            className="form-control"
                            name='offer'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Remarks</label>
                        <input
                            type="text"
                            className="form-control"
                            name='remarks'
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
