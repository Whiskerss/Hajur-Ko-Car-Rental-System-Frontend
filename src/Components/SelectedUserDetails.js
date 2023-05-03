import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Auth/Authprovide';
import { useParams } from 'react-router-dom';

export default function SelectedUserDetails() {
    const [user, setUser] = useState({});
    const [rentHistory, setRentHistory] = useState([]);
    const { id } = useParams();

    const getUserDetails = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/user/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getRentHistory = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/Rent/Rents`);
            setRentHistory(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserDetails();
        getRentHistory();
    }, []);

    return (
        <div>
            <div className="page-content page-container" id="page-content">
                <div className="">
                    <div className="row d-flex justify-content-center mx-auto mt-5">
                        <div className="col-xl-8 col-md-12">
                            <div className="card user-card-full"></div>
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile" />
                                        </div>
                                        <h4 className="f-w-600">{user.firstName} {user.lastName}</h4>
                                        <h6>{user.userRole}</h6>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{user.email}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Phone</p>
                                                <h6 className="text-muted f-w-400">{user.phoneNumber}</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Rent History</h6>
                                        <table className="table text-center">
                                            <thead className="thead bg-light">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Car ID</th>
                                                    <th>Approved By</th>
                                                    <th>Price</th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rentHistory
                                                    .filter((rent) => rent.userId.toString() === id && rent.status.id === 5)
                                                    .map((val) => {
                                                        return (
                                                            <tr key={val.id}>
                                                                <td>{val.id}</td>
                                                                <td>{val.carId}</td>
                                                                <td>{val.approvedBy}</td>
                                                                <td>{val.price}</td>
                                                                <td>{val.rentDuration}</td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Documents</h6>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-center">License</h6>
                                        {user.license === 'string' || !user.license ? (
                                            null
                                        ) :
                                            (<img className="img-fluid" src={user.license} style={{ height: '350px', width: '100%', objectFit: 'cover' }} alt={`${user.firstName}`} />)
                                        }
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-center">Citizenship</h6>
                                        {user.citizenship === 'string' || !user.citizenship ? (
                                            null
                                        ) :
                                            (<img className="img-fluid" src={user.citizenship} style={{ height: '350px', width: '100%', objectFit: 'cover' }} alt={`${user.firstName}`} />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
