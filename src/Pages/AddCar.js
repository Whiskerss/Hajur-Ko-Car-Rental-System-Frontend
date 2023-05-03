import React, { useState } from 'react';
import { axiosInstance } from '../Auth/Authprovide';
import { toast } from 'react-toastify';

export default function AddCar() {
    const [formData, setFormData] = useState(
        {
            name: "",
            description: "",
            imageUrl: "",
            price: 0,
        }
    );

    const notifySuccess = () => {
        toast.success(`Car Details Uploaded!`, {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.name !== "" && formData.description !== "" && formData.imageUrl !== "" && formData.price !== 0) {
            try {
                const { name, description, imageUrl, price } = formData;
                const response = await axiosInstance.post('/car', { name, description, imageUrl, price });

                if (response) {
                    setFormData({ name: '', description: '', imageUrl: '', price: 0 });
                    notifySuccess();
                }
            } catch (error) {
                console.error(error);
                notifyFail(error);
            }
        } else {
            notifyFail('Please Fill The Required Data!');
        }
    };

    return (
        <div className='form-container mx-auto' style={{ maxWidth: '80%' }}>
            <h2>Register New Car:</h2>
            <form className="row g-3 needs-validation mt-5" onSubmit={handleSubmit}>
                <div className="col-6">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name='name'
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Description:</label>
                    <textarea
                        name='description'
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        name="imageUrl"
                        className="form-control"
                        onChange={handleImageUpload}
                        required
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Price:</label>
                    <input
                        type="int"
                        name='price'
                        className="form-control"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};