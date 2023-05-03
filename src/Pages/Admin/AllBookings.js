import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';

export default function AllBookings() {
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // state for filter

    const statusTextMap = {
        1: 'Accepted',
        2: 'Rejected',
        3: 'Cancel',
        5: 'Returned'
    };

    const getRents = async () => {
        try {
            await axiosInstance
                .get(`https://localhost:7013/api/Rent/Rents`)
                .then((response) => {
                    const filteredRents = response.data.filter(
                        (rent) => rent.status.id !== 4
                    );
                    setRents(filteredRents);
                })
                .catch((error) => {
                    console.log(error);
                    setError('Failed to retrieve car details.');
                });
        } catch (error) {
            console.log(error);
            setError('Failed to retrieve car details.');
        }
    };

    useEffect(() => {
        getRents();
    }, []);

    // handle filter change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    // filter rentals data by selected status
    const filteredRents = filter === 'all' ? rents : rents.filter(rent => rent.status.id.toString() === filter);

    return (
        <div>
            {error && <h2 className='text-center'>{error}</h2>}
            <div className="d-flex justify-content-end">
                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="statusFilter" style={{ width: '150px'}}>Filter by status:</label>
                    <select style={{ width: '250px' }} className="form-control" id="statusFilter" value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        {Object.keys(statusTextMap).map(statusId => (
                            <option key={statusId} value={statusId}>{statusTextMap[statusId]}</option>
                        ))}
                    </select>
                </div>
            </div>
            <table className="table table-bordered">
                <thead className="thead bg-light">
                    <tr>
                        <th>Rent ID</th>
                        <th>Car ID</th>
                        <th>Rented By</th>
                        <th>Rented On</th>
                        <th>Return Date</th>
                        <th>Approved By</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRents.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.carId}</td>
                                <td>{val.userId}</td>
                                <td>{val.rentedOn}</td>
                                <td>{val.rentedUntil}</td>
                                <td>{val.approverBy}</td>
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
