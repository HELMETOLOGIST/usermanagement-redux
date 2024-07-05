import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../../features/user";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registered, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace from inputs
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Simple validation checks
    if (trimmedUsername.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(trimmedPassword)) {
      toast.error("Password must contain at least one uppercase letter, one number, one symbol, and be at least 8 characters long");
      return;
    }

    // Dispatch register action
    dispatch(register({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword }))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Registration successful!");
      })
      .catch((error) => {
        console.log(error, "Registration error");
        toast.error("Registration failed. email is already added.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      ) : (
        <div className="w-full max-w-sm p-8 rounded-xl blur-effect">
          <h2 className="mb-6 text-2xl font-semibold text-center text-white text-opacity-80">
            SignUp
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-semibold text-white text-opacity-70"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                autoComplete="username"
                required
                className="w-full px-4 py-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
              />
            </div>
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
                value={email}
                onChange={onChange}
                required
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
                value={password}
                onChange={onChange}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 mb-3 leading-tight text-gray-700 glass-input focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="glass-button font-bold bg-transparent rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-6 py-3"
              >
                Sign Up
              </button>
            </div>
            <p className="flex items-center justify-center mt-3 font-light">
              If you have an account,{" "}
              <NavLink className="nav-link" to="/">
                Sign In
              </NavLink>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
