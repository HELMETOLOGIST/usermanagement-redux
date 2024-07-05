import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ isOpen, onClose, user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const dispatch = useDispatch();

  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateUsername() || !validateEmail()) {
      return;
    }

    // Dispatch the updateUser action with form data
    dispatch(updateUser({ id: user.id, username, email }))
      .unwrap()
      .then((data) => {
        console.log('User updated successfully:', data);
        toast.success('User updated successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        onClose(); // Close the modal after successful update
      })
      .catch((err) => {
        console.error('User update failed:', err);
        toast.error('User update failed. Please try again later.', {
          position: toast.POSITION.TOP_RIGHT
        });
        // Handle error actions (e.g., show error message)
      });
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-xl">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
            <h2 className="text-white text-lg font-bold">Edit User</h2>
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
                  className="glass-input w-full text-white bg-transparent px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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
                  className="glass-input w-full text-white bg-transparent px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
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

export default EditUserModal;
