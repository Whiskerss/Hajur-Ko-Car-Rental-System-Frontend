import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';

export default function CurrentBookings() {
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);

    const statusTextMap = {
        1: 'Accepted',
        2: 'Rejected',
        3: 'Cancel',
        4: 'Requested',
        5: 'Returned'
    };

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/Rent/Rents`);
            setRents(response.data);

        } catch (error) {
            console.log(error)
            setError('Failed to retrieve car details.');
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
                        .filter((rent) => rent.status.id === 1) // filter by status id
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
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}
