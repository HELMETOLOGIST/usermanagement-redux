import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/user';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user?.user);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      console.log('admin', user);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user?.isSuperuser) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  // Validation functions
  const validateUsername = () => {
    if (username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validateEmail = () => {
    const re =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    const re =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(password)) {
      setPasswordError('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateUsername() || !validateEmail() || !validatePassword()) {
      return;
    }

    // Dispatch the register action with form data
    dispatch(register({ username, email, password }))
      .unwrap()
      .then((data) => {
        console.log('Registration successful:', data);
        toast.success('User registered successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        onClose(); // Close the modal after successful registration
        window.location.reload();
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        toast.error('Registration failed. email already added.', {
          position: toast.POSITION.TOP_RIGHT
        });
        // Handle error actions (e.g., show error message)
      });

    // Clear form fields (optional, depending on your UX flow)
    setUsername('');
    setEmail('');
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-xl">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
            <h2 className="text-white text-lg font-bold">Add User</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <MdClose className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="text-white block mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={validateUsername}
                  className="glass-input w-full bg-transparent px-3 py-2 rounded border text-white border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
                {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-white block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  className="glass-input w-full bg-transparent px-3 py-2 rounded border text-white border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="text-white block mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  className="glass-input w-full bg-transparent text-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="glass-button text-white px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
