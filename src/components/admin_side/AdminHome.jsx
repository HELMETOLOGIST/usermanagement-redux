import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import AddUserModal from './AddUserModal'; // Import the modal component
import EditUserModal from "./EditUserModal";

const AdminHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false)

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Jim Beam", email: "jim@example.com" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-6xl">
        <div
          onClick={() => setIsModalOpen(true)}
          className="rounded-full overflow-hidden opacity-65 cursor-pointer border border-gray-200 h-8 w-8 flex items-center justify-center"
        >
          <MdAddCircleOutline className="h-6 w-6 text-white" />
        </div>
        <table className="w-full bg-transparent">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white opacity-80">ID</th>
              <th className="px-4 py-2 text-white opacity-80">Name</th>
              <th className="px-4 py-2 text-white opacity-80">Email</th>
              <th className="px-4 py-2 text-white opacity-80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => setIsEditOpen(true)} className="glass-button text-white px-2 py-1 rounded mx-1 hover:bg-blue-500">
                    Edit
                  </button>
                  <button className="glass-button text-white px-2 py-1 rounded mx-1 hover:bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditUserModal inOpen={isEditOpen} inClose={() => setIsEditOpen(false)}/>
    </div>
  );
};

export default AdminHome;
