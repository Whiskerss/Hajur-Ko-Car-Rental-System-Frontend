import React, { useEffect, useState } from 'react'
import { axiosInstance, useAuth } from '../Auth/Authprovide';
import CancelWarning from '../Components/CancelWarning';

export default function MyBookings() {
    const { currentUser } = useAuth();
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);

    const statusTextMap = {
        1: 'Accepted',
        2: 'Rejected',
        3: 'Cancel',
        4: 'Requested',
        5: 'Returned'
    };

    const [popUpCancel, setPopUpCancel] = useState({
        show: false,
        id: null,
    })

    const handleCancelPop = (id) => {
        setPopUpCancel({
            show: true,
            id,
        })
    }

    const handleCloseCancel = () => {
        setPopUpCancel({
            show: false,
            id: null,
        })
        getRents();
    }


    const getRents = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/Rent/Rents`);
            setRents(response.data);

        } catch (error) {
            console.log(error)
            setError('Failed to retrieve car details.');
        }
    }


    useEffect(() => {
        getRents();
    }, []);

    return (
        <div>
            {error && <h2 className='text-center'>{error}</h2>}
            <table className="table table-bordered">
                <thead className="thead bg-light">
                    <tr>
                        <th>Rent ID</th>
                        <th>Car ID</th>
                        <th>Approved By</th>
                        <th>Rented On</th>
                        <th>Return Date</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rents
                        .filter((rent) => (rent.status.id === 1 || rent.status.id === 4) && rent.userId === currentUser.id)
                        .map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.carId}</td>
                                    <td>{val.approverBy}</td>
                                    <td>{val.rentedOn}</td>
                                    <td>{val.rentedUntil}</td>
                                    <td>{val.rentDuration} days</td>
                                    <td>$ {val.price}</td>
                                    <td>{statusTextMap[val.status.id]}</td>
                                    <td className='d-flex justify-content-around'>
                                        <div className='btn btn-danger' onClick={() => { handleCancelPop(val.id) }}>Cancel</div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {popUpCancel.show && (<CancelWarning show={popUpCancel.show} onClose={handleCloseCancel} id={popUpCancel.id} />)}
        </div>
    )
}
