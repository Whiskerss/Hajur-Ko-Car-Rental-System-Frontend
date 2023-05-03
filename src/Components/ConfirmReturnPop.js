import React from 'react'
import { Modal } from 'react-bootstrap';
import { axiosInstance } from '../Auth/Authprovide';
import { toast } from 'react-toastify';

export default function ConfirmReturnPop({ show, onClose , id}) {
    const notifyFail = (e) => {
        toast.error(e, {
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark'
        });
    }

    const returnCar = async () => {
        try {
            const response = await axiosInstance.patch(`https://localhost:7013/api/Rent/return/${id}`);
            if (response) {
                notifyFail('Car Returned.');
                onClose();
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Return?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to return this car?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={returnCar}>Confirm</button>
                <button className="btn btn-secondary" onClick={onClose}>No</button>
            </Modal.Footer>
        </Modal>
    )
}
