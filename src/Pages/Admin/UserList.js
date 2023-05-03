import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/user/users`);
            setUsers(response.data);
        } catch (error) {
            setError('Failed to retrieve user details.');
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Filter users by role before mapping over them
    const usersList = users.filter(user => user.userRole === 'User');

    return (
        <div>
            {error && <div>{error}</div>}
            <table className="table table-bordered">
                <thead className="thead bg-light">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.email}</td>
                                <td>{val.phoneNumber}</td>
                                <td className='d-flex'>
                                    <div className='btn btn-success mx-auto' onClick={() => navigate(`/selectedUserDetails/${val.id}`)}>View Details</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
