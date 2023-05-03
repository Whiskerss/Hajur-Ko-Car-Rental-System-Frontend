import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../Auth/Authprovide';
import { useNavigate } from 'react-router-dom';
import PromoteWarning from '../../Components/PromoteWarning';

export default function StaffList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [popUpCancel, setPopUpCancel] = useState({
        show: false,
        id: null,
    })

    const handleCancelPop = (id) => {
        setPopUpCancel({
            show: true,
            id,
        })
    }

    const handleCloseCancel = () => {
        setPopUpCancel({
            show: false,
            id: null,
        })
        getUsers();
    }

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
    const staffUsers = users.filter(user => user.userRole === 'Staff');

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
                    {staffUsers.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.email}</td>
                                <td>{val.phoneNumber}</td>
                                <td className='d-flex justify-content-around'>
                                    <div className='btn btn-primary' onClick={() => navigate(`/selectedUserDetails/${val.id}`)} >View Details</div>
                                    <div className='btn btn-success' onClick={() => { handleCancelPop(val.id) }} >Promote</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {popUpCancel.show && (<PromoteWarning show={popUpCancel.show} onClose={handleCloseCancel} id={popUpCancel.id} />)}
        </div>
    )
}
