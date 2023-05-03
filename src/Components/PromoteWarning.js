import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { axiosInstance } from '../Auth/Authprovide';

export default function PromoteWarning({ show, onClose, id }) {

    const notifySuccess = () => {
        toast.success('User Promoted To Admin!', {
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
    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance
            .patch(`https://localhost:7013/api/user/${id}/Admin`, {
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
                <Modal.Title>Confirm Promote?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Are you sure you want to promote this user to admin?</h3>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={handleSubmit}>Yes</button>
                <button className="btn btn-danger" onClick={onClose}>No</button>
            </Modal.Footer>
        </Modal>
    )
}
