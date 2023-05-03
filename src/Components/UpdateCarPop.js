import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../Auth/Authprovide';
import { Modal } from 'react-bootstrap';

export default function UpdateCarPop({ show, onClose, carId, name, description, imageUrl, price }) {
    const [formData, setFormData] = useState(
        {
            name: '',
            description: '',
            imageUrl: '',
            price: '',
        }
    );

    const notifySuccess = () => {
        toast.success('Car Details Updated!', {
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

    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formImage = new FormData();
        formImage.append("file", file);
        formImage.append("upload_preset", "xkpbw7hl");
        formImage.append('cloud_name', 'ddxmod0nm');

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/ddxmod0nm/image/upload',
                {
                    method: 'post',
                    body: formImage,
                }
            );
            const data = await response.json(); // Parse the response JSON
            setFormData({ ...formData, imageUrl: data.secure_url });
        } catch (error) {
            notifyFail(error);
            console.error(error);
            // Do something with error (e.g. show error message)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance
            .put(`https://localhost:7013/api/car/${carId}`, {
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageUrl,
                price: formData.price,
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
                <Modal.Title>Update Car Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3 needs-validation">
                    <div className="col-12">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            name='name'
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Description:</label>
                        <textarea
                            name='description'
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            name="imageUrl"
                            className="form-control"
                            onChange={handleImageUpload}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Price:</label>
                        <input
                            type="int"
                            name='price'
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={handleSubmit}>Update</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
