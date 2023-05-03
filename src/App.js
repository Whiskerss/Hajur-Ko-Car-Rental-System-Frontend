import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { AuthProvider } from './Auth/Authprovide';
import CarDetails from './Pages/CarDetails';
import NavbarComp from './Components/Navbar';
import AdminRegister from './Pages/Admin/AdminRegister';
import ReturnCar from './Pages/ReturnCar';
import ViewCars from './Pages/ViewCars';
import DamageForm from './Pages/DamageForm';
import UserProfile from './Pages/UserProfile';
import AddCar from './Pages/AddCar';
import UserDetails from './Pages/Admin/UserDetails';
import RentalDetails from './Pages/Admin/RentalDetails';
import SelectedUserDetails from './Components/SelectedUserDetails';
import MyBookings from './Pages/MyBookings';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavbarComp />
        <ToastContainer position='bottom-left' />
        <Routes>
          <Route exact path="/" element={<ViewCars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myBookings" element={<MyBookings />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/carDetails/:id" element={<CarDetails />} />
          <Route path="/selectedUserDetails/:id" element={<SelectedUserDetails />} />
          <Route path="/rentalDetails" element={<RentalDetails />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/returnCar" element={<ReturnCar />} />
          <Route path="/damageForm" element={<DamageForm />} />
          <Route path="/addCar" element={<AddCar />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
