import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Auth/Authprovide';
import ConfirmReturnPop from '../Components/ConfirmReturnPop';
import { toast } from 'react-toastify';

export default function ReturnCar() {
    const [rents, setRents] = useState([]);
    const [error, setError] = useState(null);

    const [popUpReturn, setPopUpReturn] = useState({
        show: false,
        id: null,
    })

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

    const handleReturnPop = (id) => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour < 9 || currentHour >= 17) {
            notifyFail('You can only return cars between 9am and 5pm');
            return;
        }
        setPopUpReturn({
            show: true,
            id,
        })
    }

    const handleCloseReturn = () => {
        setPopUpReturn({
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
                        <th>Rented By</th>
                        <th>Rented On</th>
                        <th>Return Date</th>
                        <th>Approved By</th>
                        <th>Price</th>
                        <th>Duration</th>
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
                                    <td>{val.approverBy}</td>
                                    <td>$ {val.price}</td>
                                    <td>{val.rentDuration}</td>
                                    <td className='d-flex justify-content-around'>
                                        <div className='btn btn-success' onClick={() => { handleReturnPop(val.id) }}>Return</div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {popUpReturn.show && (<ConfirmReturnPop show={popUpReturn.show} onClose={handleCloseReturn} id={popUpReturn.id} />)}
        </div>
    )
}
