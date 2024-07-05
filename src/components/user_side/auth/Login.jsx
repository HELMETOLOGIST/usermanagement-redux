import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetRegistered, login } from "../../../features/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, registered } = useSelector((state) => state.user);
  const isSuperuser = useSelector((state) => state.user.user?.isSuperuser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registered) dispatch(resetRegistered());
  }, [registered, dispatch]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Invalid credentials. Please try again.");
      });
  };

  if (isAuthenticated) {
    if (isSuperuser) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 rounded-xl blur-effect">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white text-opacity-80">
          Login
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              value={email}
              required
              autoComplete="email"
              className="w-full px-4 py-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-semibold text-white text-opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChange}
              value={password}
              autoComplete="password"
              required
              className="w-full px-4 py-3 mb-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="glass-button font-bold bg-transparent rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-6 py-3"
            >
              Sign In
            </button>
          </div>
          <p className="flex items-center justify-center mt-3 font-light">
            If you don't have any account,{" "}
            <NavLink className="nav-link text-blue-400" to="/signup">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
