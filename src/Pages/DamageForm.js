import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Auth/Authprovide';
import DamageFormPop from '../Components/DamageFormPop';

export default function DamageForm() {
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);
    const [popUpView, setPopUpView] = useState({
        show: false,
        id: null,
    })
    const statusTextMap = {
        1: 'Accepted',
        2: 'Rejected',
        3: 'Cancel',
        4: 'Requested',
        5: 'Returned'
    };

    const handleView = (carId) => {
        setPopUpView({
            show: true,
            carId,
        })
    }

    const handleClose = () => {
        setPopUpView({
            show: false,
            id: null,
        })
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
                        <th>Rented On</th>
                        <th>Return Date</th>
                        <th>Approved By</th>
                        <th>Remarks</th>
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
                                    <td>{val.rentedOn}</td>
                                    <td>{val.rentedUntil}</td>
                                    <td>{val.approverBy}</td>
                                    <td>{val.remarks}</td>
                                    <td>$ {val.price}</td>
                                    <td>{val.rentDuration} days</td>
                                    <td>{statusTextMap[val.status.id]}</td>
                                    <td className='d-flex justify-content-around'>
                                        <div className='btn btn-danger' onClick={() => { handleView(val.carId) }}>Damage</div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {popUpView.show && (<DamageFormPop show={popUpView.show} onClose={handleClose} carId={popUpView.carId}/>)}
        </div>
    )
}