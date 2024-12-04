"use client";

import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function UserList() {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, username: "admin", email: "admin@example.com", password: "123" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleEdit = (user: UserData) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex flex-col items-center flex-1 bg-gray-100 p-4">
          <h1 className="text-[#1b3c79] text-2xl font-bold mb-6">
            Lista de Usuários
          </h1>
          <table className="text-black table-auto border-collapse border border-gray-300 w-full max-w-4xl bg-white rounded-md shadow-md">
            <thead>
              <tr className="text-[#1b3c79] bg-gray-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Usuário</th>
                <th className="border border-gray-300 p-2">E-mail</th>
                <th className="border border-gray-300 p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 p-2 text-center">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 p-2">{user.username}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal de Edição */}
          {isModalOpen && currentUser && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-[#1b3c79] text-xl font-bold mb-4">
                  Editar Usuário
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="text-black mb-4">
                    <label className="block text-gray-700 mb-2">Usuário</label>
                    <input
                      type="text"
                      value={currentUser.username}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, username: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="text-black mb-4">
                    <label className="block text-gray-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, email: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="text-black mb-4">
                    <label className="block text-gray-700 mb-2">Senha</label>
                    <input
                      type="password"
                      value={currentUser.password}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, password: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
