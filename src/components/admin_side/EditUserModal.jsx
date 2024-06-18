import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const EditUserModal = ({ inOpen, inClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to handle form submission (e.g., API call)
    console.log('Submitted:', { username, email });
    // Clear form fields
    setUsername('');
    setEmail('');
    // Close the modal after submission
    inClose();
  };

  if (!inOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-xl">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
          <h2 className="text-white text-lg font-bold">Edit User</h2>
          <button
            onClick={inClose}
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
                className="glass-input w-full bg-transparent px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white block mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full bg-transparent px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
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
  );
};

export default EditUserModal;
