import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/user_side/auth/Login";
import SignUp from "./components/user_side/auth/SignUp";
import Navbar from "./components/user_side/home/Navbar";
import Profile from "./components/user_side/home/Profile";
import Footer from "./components/user_side/home/Footer";
import Home from "./components/user_side/home/Home";
import AdminHome from "./components/admin_side/AdminHome";
import { Provider } from "react-redux";
import  store  from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import {  persistor } from './store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Main />
        <ToastContainer />
      </Router>
      </PersistGate>
   </Provider>
  );
};

const Main = () => {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

export default App;
