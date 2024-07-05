import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/user";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.user);
  const { isAuthenticated, users } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.isSuperuser) {
      navigate("/");
    } else {
      dispatch(fetchUsers());
    }
  }, [isAuthenticated, user, navigate, dispatch]);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success('User deleted successfully!', {
        });
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user. Please try again later.', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  const filteredUsers = users.filter(u => !u.is_superuser);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-6xl">
        <div
          onClick={openAddModal}
          className="rounded-full overflow-hidden opacity-65 cursor-pointer border border-gray-200 h-8 w-8 flex items-center justify-center"
        >
          <MdAddCircleOutline className="h-6 w-6 text-gray-400 hover:text-blue-400 transition-colors duration-300" />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border text-white px-4 py-2">{user.id}</td>
                  <td className="border text-white px-4 py-2">{user.username}</td>
                  <td className="border text-white px-4 py-2">{user.email}</td>
                  <td className="border text-white px-4 py-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="glass-button font-semibold opacity-80 mt-3 bg-transparent text-blue-500 rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-8 py-1"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="glass-button font-semibold opacity-80 mt-3 bg-transparent text-red-600 rounded-full focus:outline-none focus:shadow-outline text-opacity-70 px-8 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal isOpen={isModalOpen} onClose={closeAddModal} />
      <EditUserModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        user={selectedUser}
      />
      <ToastContainer />
    </div>
  );
};

export default AdminHome;
