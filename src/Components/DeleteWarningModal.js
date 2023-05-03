import React from 'react'
import { Modal } from 'react-bootstrap'
import { axiosInstance } from '../Auth/Authprovide';
import { toast } from 'react-toastify';

export default function DeleteWarningModal({ show, onClose, url}) {

    const notifySuccess = () => {
        toast.success('Car Details Deleted!', {
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
            theme: "dark"
        });
    }

    const handleDelete = async () => {
        axiosInstance
            .delete(url)
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
                <Modal.Title>Confirm Delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this item?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
