import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';
import { toast } from 'react-toastify';

export default function RequestList() {
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);

    const statusTextMap = {
        1: 'Accepted',
        2: 'Rejected',
        3: 'Cancel',
        4: 'Requested',
        5: 'Returned'
    };

    const notifySuccess = (msg) => {
        toast.success(msg, {
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

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/Rent/Rents`);
            setRents(response.data);

        } catch (error) {
            console.log(error)
            setError('Failed to retrieve car details.');
        }
    }

    const acceptRequest = async (rentId) => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour < 9 || currentHour >= 17) {
            notifyFail('You can only approve a request between 9am and 5pm');
            return;
        }
        try {
            const response = await axiosInstance.post(`https://localhost:7013/api/Rent/approve/${rentId}`);
            if (response) {
                notifySuccess('Rent Request Approved');
                getUsers();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const declineRequest = async (rentId) => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour < 9 || currentHour >= 17) {
            notifyFail('You can only decline a request between 9am and 5pm');
            return;
        }

        try {
            const response = await axiosInstance.post(`https://localhost:7013/api/Rent/reject/${rentId}`);
            if (response) {
                notifyFail('Rent Request Declined');
                getUsers();
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {error && <h2 className='text-center'>{error}</h2>}
            <table className="table table-bordered">
                <thead className="thead bg-light">
                    <tr>
                        <th>Rent ID</th>
                        <th>Car ID</th>
                        <th>Requested By</th>
                        <th>Rented On</th>
                        <th>Return Date</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rents
                        .filter((rent) => rent.status.id === 4) // filter by status id
                        .map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.carId}</td>
                                    <td>{val.userId}</td>
                                    <td>{val.rentedOn}</td>
                                    <td>{val.rentedUntil}</td>
                                    <td>$ {val.price}</td>
                                    <td>{val.rentDuration} days</td>
                                    <td>{statusTextMap[val.status.id]}</td>
                                    <td className='d-flex justify-content-around'>
                                        <div className='btn btn-success' onClick={() => acceptRequest(val.id)}>Accept</div>
                                        <div className='btn btn-danger' onClick={() => declineRequest(val.id)}>Decline</div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}
