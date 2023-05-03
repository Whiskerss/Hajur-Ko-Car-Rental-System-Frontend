import React, { useState } from 'react'
import { useAuth } from '../Auth/Authprovide';
import '../Css/UserProfile.css';
import ChangePasswordPop from '../Components/ChangePasswordPop';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function UserProfile() {
    const [license, setLicense] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const { currentUser } = useAuth();
    const [popUpView, setPopUpView] = useState({
        show: false,
    })

    const handleView = () => {
        setPopUpView({
            show: true,
        })
    }

    const handleClose = () => {
        setPopUpView({
            show: false,
        })
    }

    const notifySuccess = () => {
        toast.success(`Document Uploaded!`, {
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
            setLicense(data.secure_url);
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
            setCitizenship(data.secure_url);
        } catch (error) {
            notifyFail(error);
            console.error(error);
            // Do something with error (e.g. show error message)
        }
    };

    const handleSubmitLicense = (e) => {
        e.preventDefault();

        axios
            .patch(`https://localhost:7013/api/user/LicenseAdd/${currentUser.id}?license=${license}`)
            .then((response) => {
                if (response) {
                    notifySuccess();
                }
            })
            .catch((error) => {
                console.log(error);
                notifyFail(error);
            });
    };

    const handleSubmitCitizenship = (e) => {
        e.preventDefault();

        axios
            .patch(`https://localhost:7013/api/user//${currentUser.id}?citizenship=${citizenship}`)
            .then((response) => {
                if (response) {
                    notifySuccess();
                }
            })
            .catch((error) => {
                console.log(error);
                notifyFail(error);
            });
    };

    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center mx-auto mt-3">
                    <div className="col-xl-8 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile" />
                                        </div>
                                        <h4 className="f-w-600">{`${currentUser.firstName} ${currentUser.lastName}`}</h4>
                                        <h6>{currentUser.userRole}</h6>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h4 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h4>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h6 className="m-b-10 f-w-600">Email</h6>
                                                <h6 className="text-muted f-w-400">{currentUser.email}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <h6 className="m-b-10 f-w-600">Phone</h6>
                                                <h6 className="text-muted f-w-400">{currentUser.phoneNumber}</h6>
                                            </div>
                                        </div>
                                        <h4 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Settings</h4>
                                        <div className="col-sm-6">
                                            <button className="btn btn-warning" onClick={() => { handleView() }}>Change Password</button>
                                        </div>
                                        <h4 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Documents</h4>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-center">License</h6>
                                        {currentUser.license === 'string' || !currentUser.license ? (
                                            <div className='row'>
                                                <div className="col-md-12">
                                                    <form className="row needs-validation" onSubmit={handleSubmitLicense}>
                                                        <label className="form-label">Upload License</label>
                                                        <div class="input-group mb-3">
                                                            <input type="file" class="form-control" onChange={handleLicenseUpload} />
                                                            <div class="input-group-prepend">
                                                                <button type="submit" class="btn btn-primary">Upload</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ) :
                                            (<img className="img-fluid" src={currentUser.license} style={{ height: '350px', width: '100%', objectFit: 'cover' }} alt={`${currentUser.firstName}`} />)
                                        }
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-center">Citizenship</h6>
                                        {currentUser.citizenship === 'string' || !currentUser.citizenship ? (
                                            <div className='row'>
                                                <div className="col-md-12">
                                                    <form className="row needs-validation" onSubmit={handleSubmitCitizenship}>
                                                        <label className="form-label">Upload Citizenship</label>
                                                        <div class="input-group mb-3">
                                                            <input type="file" class="form-control" onChange={handleCitizenshipUpload} />
                                                            <div class="input-group-prepend">
                                                                <button type="submit" class="btn btn-primary">Upload</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ) :
                                            (<img className="img-fluid" src={currentUser.citizenship} style={{ height: '350px', width: '100%', objectFit: 'cover' }} alt={`${currentUser.firstName}`} />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {popUpView.show && (<ChangePasswordPop show={popUpView.show} onClose={handleClose} />)}
        </div >
    )
}
