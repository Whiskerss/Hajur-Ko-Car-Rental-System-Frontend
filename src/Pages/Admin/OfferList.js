import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';
import DeleteWarningModal from '../../Components/DeleteWarningModal';

export default function OfferList() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);

    const [popUpDelete, setPopUpDelete] = useState({
        show: false,
        offerId: null,
    })

    const handleDeletePop = (offerId) => {
        setPopUpDelete({
            show: true,
            offerId,
        })
    }

    const handleCloseDelete = () => {
        setPopUpDelete({
            show: false,
            offerId: null,
        })
        getOffers();
    }

    const getOffers = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/getoffer`);
            setOffers(response.data);
        } catch (error) {
            setError('Failed to retrieve user details.');
        }
    };

    useEffect(() => {
        getOffers();
    }, []);

    return (
        <div>
            {error && <div>{error}</div>}
            <table className="table table-bordered">
                <thead className="thead bg-light">
                    <tr>
                        <th>ID</th>
                        <th>Car ID</th>
                        <th>Discount</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.carId}</td>
                                <td>{val.discountPercentage} %</td>
                                <td>{val.remarks}</td>
                                <td className='d-flex'>
                                    <div className='btn btn-danger mx-auto' onClick={() => { handleDeletePop(val.id) }} >Delete</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {popUpDelete.show && (<DeleteWarningModal show={popUpDelete.show} onClose={handleCloseDelete} url={`https://localhost:7013/deleteofferby/${popUpDelete.offerId}`} />)}
        </div>
    )
}
