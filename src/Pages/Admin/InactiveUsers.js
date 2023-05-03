import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';

export default function InactiveUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7013/api/user/Inactive`);
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
            {error && <h4 className='text-center mt-5'>{error}</h4>}
            {!error && users.length === 0 ? (<h4 className='text-center mt-5'>Yay! No Inactive Users.</h4>) :
                (<table className="table table-bordered">
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
                                    <td className='d-flex justify-content-between'>
                                        <div className='btn btn-success' >View Details</div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>)}
        </div>
    )
}
