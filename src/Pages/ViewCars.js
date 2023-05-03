import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopularCars from '../Components/PopularCars';

export default function ViewCars() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const statusTextMap = {
        1: 'Available',
        2: 'Unavailable',
    };

    const getCars = async () => {
        try {
            const response = await axios.get('https://localhost:7013/api/car');
            setCars(response.data);
        } catch (error) {
            setError('Failed to retrieve car list.');
        }
    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <div>
            <div className="container" >
                <PopularCars />
                <h4 className="m-t-40 p-b-5 b-b-default f-w-600 text-danger text-center">Browse Cars</h4>
                {error && <div>{error}</div>}
                <div className="card-group mt-3">
                    <div className='row g-2' style={{ minWidth: '100%' }}>
                        {cars.map(car => (
                            <div key={car.id} className="col-sm-4 col-sm-6 col-lg-4 mb-4">
                                <div className="card border" style={{ height: '100%', minWidth: '18rem' }}>
                                    <img className="card-img-top" src={car.imageUrl} alt={`${car.name}`} style={{ height: '350px', objectFit: 'cover' }} />
                                    <div className="card-body">
                                        <h3 className="card-text">{car.name}</h3>
                                        <p className="card-text fs-6">${car.price} /day</p>
                                        <p className="card-text fs-6">{statusTextMap[car.rStatus.id]}</p>
                                        {car.offer[0] ? (<p className="card-text text-danger fw-bold fs-6">{car.offer[0].discountPercentage} % Off</p>) : null}
                                        <p className="card-text">{car.description}</p>
                                    </div>
                                    <div className="card-footer" role="button" onClick={() => navigate(`/carDetails/${car.id}`)}>
                                        <small className="text-muted">View Details</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
