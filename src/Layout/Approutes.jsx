import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useEffect } from "react";
import Layout from "./Layout";
import Home from "../Pages/Home";
import Register from "../apipages/register";
import Login from "../apipages/login";
import ResetPassword from "../apipages/Resetpage";
import Profile from "../apipages/profile";
import AddCar from "../apipages/Caradding";
import CarList from "../apipages/list the car";
import Booking from "../apipages/Booking";
import ForgotPassword from "../apipages/ForgotPassword";

import LocationCalendar from "../Pages/location";





// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component }) => {
  const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You are not authorized to view this page. You will be redirected to the home page.');
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return component;
  }

  // Redirect to home page if not authenticated
  return <Navigate to="/" />;
};


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="profile" element={<ProtectedRoute component={<Profile/>}/>}/>
          <Route path="booking" element={<Booking/>} />
        </Route>
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} /> 
           <Route path="/location" element={<LocationCalendar/>} />
           <Route path="/addcar" element={<ProtectedRoute component={<AddCar/>}/>}/>
           <Route path="listcar" element={<ProtectedRoute component={<CarList/>}/>}/>
      </Routes>
    </BrowserRouter>
  );
};



export default AppRoutes;