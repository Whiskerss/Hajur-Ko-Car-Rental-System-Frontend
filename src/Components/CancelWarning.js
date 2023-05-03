import React from 'react'
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { axiosInstance } from '../Auth/Authprovide';

export default function CancelWarning({ show, onClose , id}) {
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

    const cancelRequest = async () => {
        try {
            const response = await axiosInstance.post(`https://localhost:7013/api/Rent/cancel/${id}`);
            if (response) {
                notifyFail('Rent Canceled.');
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
                <Modal.Title>Confirm Cancel?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to cancel this request?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={cancelRequest}>Confirm</button>
                <button className="btn btn-secondary" onClick={onClose}>No</button>
            </Modal.Footer>
        </Modal>
    )
}