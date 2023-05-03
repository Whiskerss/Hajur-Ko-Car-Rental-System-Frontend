import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';
import OfferFormPop from '../../Components/OfferFormPop';
import UpdateCarPop from '../../Components/UpdateCarPop';
import DeleteWarningModal from '../../Components/DeleteWarningModal';

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    const [popUpUpdate, setPopUpUpdate] = useState({
        show: false,
        carId: null,
        name: null,
        description: null,
        imageUrl: null,
        price: null,
    })

    const handleUpdateView = (carId, name, description, imageUrl, price) => {
        setPopUpUpdate({
            show: true,
            carId,
            name,
            description,
            imageUrl,
            price
        })
    }

    const handleCloseUpdate = () => {
        setPopUpUpdate({
            show: false,
            carId: null,
            name: null,
            description: null,
            imageUrl: null,
            price: null,
        })
    }

    const [popUpDelete, setPopUpDelete] = useState({
        show: false,
        carId: null,
    })

    const handleDeletePop = (carId) => {
        setPopUpDelete({
            show: true,
            carId,
        })
    }

    const handleCloseDelete = () => {
        setPopUpDelete({
            show: false,
            carId: null,
        })
        getCars();
    }

    const [popUpView, setPopUpView] = useState({
        show: false,
        id: null,
    })

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

    const getCars = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/car`);
            setCars(response.data);
        } catch (error) {
            setError('Failed to retrieve car details.');
        }
    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <div className=' mx-auto' style={{ width: '99%' }}>
            {error && <div>{error}</div>}
            <table className="table table-bordered text-center">
                <thead className="thead bg-light">
                    <tr>
                        <th>ID</th>
                        <th className='text-start'>Name</th>
                        <th className='text-start' style={{ maxWidth: '500px' }}>Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Offers</th>
                    </tr>
                </thead>
                <tbody>
                    {cars?.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td className='text-start'>{val.name}</td>
                                <td className='text-start' style={{ maxWidth: '500px' }}>{val.description}</td>
                                <td>{val.price}</td>
                                <td>{val.rStatus.id === 1 ? 'Available' : 'Rented'}</td>
                                {val.offer[0] ? (<td>{val.offer[0].discountPercentage} %</td>) : <td />}
                                <td className='d-flex justify-content-around mt-3'>
                                    <div className='btn btn-success' onClick={() => { handleUpdateView(val.id, val.name, val.description, val.imageUrl, val.price) }}>Update</div>
                                    <div className='btn btn-warning' onClick={() => { handleView(val.id) }}>Offer</div>
                                    <div className='btn btn-danger' onClick={() => { handleDeletePop(val.id) }}>Delete</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {popUpView.show && (<OfferFormPop show={popUpView.show} onClose={handleClose} carId={popUpView.carId} />)}
            {popUpUpdate.show && (<UpdateCarPop show={popUpUpdate.show} onClose={handleCloseUpdate} carId={popUpUpdate.carId} />)}
            {popUpDelete.show && (<DeleteWarningModal show={popUpDelete.show} onClose={handleCloseDelete} url={`https://localhost:7013/api/car/${popUpDelete.carId}`} />)}
        </div>
    )
}
