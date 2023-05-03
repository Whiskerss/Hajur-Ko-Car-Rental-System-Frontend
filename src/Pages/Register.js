import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            licenseUrl: '',
            citizenshipUrl: ''
        }
    );
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    const notifySuccess = () => {
        toast.success('User Registration Successful!', {
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

    const handleLicenseUpload = async (event) => {
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
            setFormData({ ...formData, licenseUrl: data.secure_url });
        } catch (error) {
            notifyFail(error);
            console.error(error);
            // Do something with error (e.g. show error message)
        }
    };

    const handleCitizenshipUpload = async (event) => {
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
            setFormData({ ...formData, citizenshipUrl: data.secure_url });
        } catch (error) {
            notifyFail(error);
            console.error(error);
            // Do something with error (e.g. show error message)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('https://localhost:7013/api/user/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                license: formData.licenseUrl,
                citizenship: formData.citizenshipUrl,
            })
            .then((response) => {
                if (response) {
                    notifySuccess();
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
                notifyFail(error);
            });
    };

    return (
        <div>
            <div className='form-container mx-auto' style={{ maxWidth: '80%' }}>
            <img class="mb-1" src="https://cdn.dribbble.com/userupload/3261442/file/original-79302dac2eb04d0f9aecac39e67b596b.png?resize=400x0" alt="" height="100"/>
                <h1>Register</h1>
                <form className="row g-3 needs-validation mt-5" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name='firstName'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name='lastName'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="int"
                            className="form-control"
                            name='phone'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Upload License</label>
                        <input className="form-control" type="file" onChange={handleLicenseUpload} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Upload Citizenship</label>
                        <input className="form-control" type="file" onChange={handleCitizenshipUpload} />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    </div>
                    <div className="signup-link text-center mt-3">Already Have an Account? <a href="/login">Login</a></div>
                </form>
            </div>
        </div>

    );
};

