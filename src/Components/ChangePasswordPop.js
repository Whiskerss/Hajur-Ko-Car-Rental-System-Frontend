import React, { useState } from 'react'
import { axiosInstance, useAuth } from '../Auth/Authprovide';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ChangePasswordPop({ show, onClose }) {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState(
        {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    );

    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    const notifySuccess = () => {
        toast.success('Password Changed!', {
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
    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance
            .patch(`https://localhost:7013/api/user/${currentUser.id}/password?password=${formData.newPassword}&oldPassword=${formData.oldPassword}`)
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
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3 needs-validation">
                    <div className="col-12">
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='oldPassword'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='newPassword'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='confirmPassword'
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={handleSubmit}>Change Password</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
