import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import '../Css/PopularCars.css'; // import the CSS file for styling

export default function PopularCars() {
  const [popularCars, setPopularCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getPopularCars = async () => {
    try {
      const response = await axios.get('https://localhost:7013/api/Rent/Rents/frequentlyrented');
      const popularCarIds = response.data.map((rent) => rent.carId);
      const popularCarsWithDetails = [];

      for (const carId of popularCarIds) {
        const carDetailsResponse = await axios.get(`https://localhost:7013/api/car/${carId}`);
        popularCarsWithDetails.push(carDetailsResponse.data);
      }

      setPopularCars(popularCarsWithDetails);
    } catch (error) {
      setError('Failed to retrieve popular car list.');
    }
  };

  useEffect(() => {
    getPopularCars();
  }, []);

  const sliderSettings = {
    autoplay: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h4 className="m-t-40 p-b-5 b-b-default f-w-600 text-danger text-center">Popular Cars</h4>
      <div className="carousel-wrapper">
        <Slider {...sliderSettings}>
          {popularCars.map((car) => (
            <div key={car.id} className="slide">
              <div className="slide-caption">
                <h3>{car.name}</h3>
                <p>${car.price} /day</p>
                <p>{car.description}</p>
              </div>
              <img
                src={car.imageUrl}
                alt={car.name}
                className="slide-image"
              />
            </div>
          ))}
        </Slider>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}