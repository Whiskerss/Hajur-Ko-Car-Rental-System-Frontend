import React, { useState } from 'react'
import CarList from './CarList';
import RequestList from './RequestList';
import OfferList from './OfferList';
import AllBookings from './AllBookings';
import CurrentBookings from './CurrentBookings';

export default function RentalDetails() {
    const [activeTab, setActiveTab] = useState('cars');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('cars')}>Cars</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('allBookings')}>All Bookings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('currentRents')}>Currently Rented</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('requests')}>Requests</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('offers')}>Offers</a>
                </li>

            </ul>
            {activeTab === 'cars' && <div><CarList /></div>}
            {activeTab === 'allBookings' && <div><AllBookings /></div>}
            {activeTab === 'currentRents' && <div><CurrentBookings /></div>}
            {activeTab === 'requests' && <div><RequestList /></div>}
            {activeTab === 'offers' && <div><OfferList /></div>}
        </div>
    )
}
