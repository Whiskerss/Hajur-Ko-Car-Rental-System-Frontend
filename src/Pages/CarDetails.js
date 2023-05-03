import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Auth/Authprovide';
import { Form } from 'react-bootstrap';

export default function CarDetails() {
    const [car, setCar] = useState({});
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();
    const { id } = useParams();
    const [formData, setFormData] = useState(
        {
            pickupDate: '',
            returnDate: '',
        }
    );

    const notifySuccess = () => {
        toast.success(`Rent request has been posted for, ${car.name}.`, {
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
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        });
    }

    const getCarDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:7013/api/car/${id}`);
            setCar(response.data);
        } catch (error) {
            setError('Failed to retrieve car details.');
        }
    }

    useEffect(() => {
        getCarDetails();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    }

    const handleBuyClick = (e) => {
        e.preventDefault();

        if (currentUser) {
            if (currentUser.userRole !== 'Admin') {
                if (currentUser.license || currentUser.citizenship) {
                    if (formData.pickupDate && formData.returnDate) {
                        // Get the selected pickup and return dates
                        const pickupDate = new Date(formData.pickupDate);
                        const returnDate = new Date(formData.returnDate);

                        // Calculate the duration and stringify the dates
                        const durationInMs = returnDate.getTime() - pickupDate.getTime();
                        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
                        const pickupDateString = pickupDate.toISOString();
                        const returnDateString = returnDate.toISOString();

                        // Make the rental request
                        axios
                            .post('https://localhost:7013/api/Rent/request', {
                                userId: currentUser.id,
                                carId: car.id,
                                price: car.price * durationInDays,
                                rentOn: pickupDateString,
                                rentUntil: returnDateString,
                                rentDuration: durationInDays
                            })
                            .then((response) => {
                                console.log(response.data);
                                notifySuccess();
                            })
                            .catch((error) => {
                                console.log(error);
                                if (error.response.data) {
                                    notifyFail(error.response.data);
                                }
                                else {
                                    notifyFail(error.message);
                                }
                            });
                    } else {
                        notifyFail('Please Specify The PickUp and Return Date!');
                    }
                } else {
                    notifyFail('Please Upload Your License or Citizenship To Rent!');
                }
            } else {
                notifyFail('Admins Cannot Rent!');
            }
        } else {
            notifyFail('Please Login To Rent!');
        }
    };

    return (
        <div>
            <div className="details-container card m-2 mt-5 border">
                {error && <div>{error}</div>}
                <div className="row">
                    <div className="col-sm-6">
                        <img className="img-fluid" src={car.imageUrl} style={{ height: '600px', width: '100%', objectFit: 'cover' }} alt={`${car.name}`} />
                    </div>
                    <div className="col-sm-6 p-5">
                        <h1>{car.name}</h1>
                        <h2>${car.price}</h2>
                        <p>{car.description}</p>
                        <form className="row w-50 g-3 needs-validation mt-5" noValidate>
                            <div>
                                <label className="form-label">Pickup Date</label>
                                <Form.Control
                                    type="date"
                                    name='pickupDate'
                                    id="inputDate"
                                    placeholder="Date to Rent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Return Date</label>
                                <Form.Control
                                    type="date"
                                    name='returnDate'
                                    id="inputDate"
                                    placeholder="Date to Rent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>

                </div>
                <div className="text-center" >
                    <button className="btn btn-primary bottom-0  btn-lg" style={{marginTop:'-100px', marginRight: '-500px'}} onClick={handleBuyClick}>Rent Now</button>
                </div>
            </div>
        </div>
    )
}
