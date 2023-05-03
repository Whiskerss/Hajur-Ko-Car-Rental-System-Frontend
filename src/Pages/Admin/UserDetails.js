import React, { useState } from 'react'
import UserList from './UserList';
import StaffList from './StaffList';
import InactiveUsers from './InactiveUsers';
import FrequentUsers from './FrequentUsers';
import { useAuth } from '../../Auth/Authprovide';

export default function UserDetails() {
    const [activeTab, setActiveTab] = useState('users');
    const { currentUser } = useAuth();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('users')}>User</a>
                </li>
                {currentUser.userRole === 'Staff' ? null : <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('staff')}>Staff</a>
                </li>}

                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('inactive')}>Inactive Users</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={() => handleTabClick('frequent')}>Frequently Active Users</a>
                </li>
            </ul>
            {activeTab === 'users' && <div><UserList /></div>}
            {activeTab === 'staff' && <div><StaffList /></div>}
            {activeTab === 'inactive' && <div><InactiveUsers /></div>}
            {activeTab === 'frequent' && <div><FrequentUsers /></div>}
        </div>
    )
}
