import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
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

    const notifySuccess = (name) => {
        toast.success(`Welcome, ${name} !`, {
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

        axios
            .post('https://localhost:7013/api/user/login', {
                email: formData.email,
                password: formData.password,
            })
            .then((response) => {
                console.log(response.data);
                const token = response.data.token;
                const currentUser = response.data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(currentUser));

                notifySuccess(currentUser.firstName + ' ' + currentUser.lastName);
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error);
                notifyFail(error.message);
            });
    };

    return (
        <div>
            <div className='form-container'>
            <img class="mb-1" src="https://cdn.dribbble.com/userupload/3261442/file/original-79302dac2eb04d0f9aecac39e67b596b.png?resize=400x0" alt="" height="100"/>
                <h1>Login</h1>
                <form className="row g-3 needs-validation mt-5" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>
                    <div className="signup-link text-center mt-3">Do Not Have an Account? <a href="/register">Sign Up</a></div>
                </form>
            </div>
        </div>
    );
};