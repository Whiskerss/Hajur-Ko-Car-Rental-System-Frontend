import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/Authprovide';

export default function NavbarComp() {
    const navigate = useNavigate();
    const { token, currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login'
    }

    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg" className='text-center'>
                <Container fluid>
                    <Navbar.Brand href="#">Hajur Ko Car Rental System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll ">
                        <Nav className="me-auto my-2 my-lg-0 mx-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {currentUser.userRole === "Staff" || currentUser.userRole === "User" ? (<Nav.Link href="/myBookings">My Bookings</Nav.Link>) : (null)}
                            {currentUser.userRole === "Staff" || currentUser.userRole === "Admin" ? (<Nav.Link href="/userDetails">User Details</Nav.Link>) : (null)}
                            {currentUser.userRole === "Staff" || currentUser.userRole === "Admin" ? (<Nav.Link href="/rentalDetails">Rental Details</Nav.Link>) : (null)}
                            {currentUser.userRole === "Admin" ? (<Nav.Link href="/adminRegister">Register Staff</Nav.Link>) : (null)}
                            {currentUser.userRole === "Staff" || currentUser.userRole === "Admin" ? (<Nav.Link href="/addCar">Add Car</Nav.Link>) : (null)}
                            {currentUser.userRole === "Staff" || currentUser.userRole === "Admin" ? (<Nav.Link href="/returnCar">Return Car</Nav.Link>) : (null)}
                            {currentUser.userRole === "Staff" || currentUser.userRole === "User" ? (<Nav.Link href="/damageForm">Damage Form</Nav.Link>) : (null)}
                        </Nav>
                        {currentUser ? (<Nav className='mx-3' >
                            <NavDropdown title={currentUser.firstName}>
                                <NavDropdown.Item role='button' onClick={() => navigate('/userProfile')}>Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>) : null}

                        {!token ? (<Button variant="outline-success" onClick={() => navigate('/login')}>Login</Button>)
                            :
                            (< Button variant="outline-danger" onClick={handleLogout}>Logout</Button>)
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}
