import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { axiosInstance, useAuth } from '../Auth/Authprovide';

export default function DamageFormPop({ show, onClose, carId }) {
    const [description, setDescription] = useState('');
    const { currentUser } = useAuth();

    const notifySuccess = () => {
        toast.success('Damage Report Sent!', {
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
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const currentDatetime = new Date().toISOString(); // get current datetime in ISO format
        axiosInstance
            .post('https://localhost:7013/api/Damage', {
                description: description,
                date: currentDatetime,
                userId: currentUser.id,
                carId: carId,
                cost: 0
            })
            .then((response) => {
                if (response) {
                    notifySuccess();
                    onClose();
                }
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
                <Modal.Title>Damage Request Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3 needs-validation">
                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name='description'
                            onChange={(event) => setDescription(event.target.value)}
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
