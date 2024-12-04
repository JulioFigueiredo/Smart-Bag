"use client"
import React, { useEffect, useState } from "react";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import UserCard from "@/components/cards/UserCard";
import axios from "axios";

interface UserDetail {
  id: number;
  username: string;
  email: string;
}

export default function User() {
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [error, setError] = useState<string | null>(null);

  const imageUrl = `https://fakeimg.pl/400x300/`;

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    // const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      await axios.get('https://profandresouza.pythonanywhere.com/api/users/', {
        headers: {
          'Authorization': `Bearer ${access_token}`, 
          'Accept': 'application/json',
        }
      })
      .then((res) => {
        console.log(res.data)
        setUsers(res.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao carregar usuários.');
      });
    };

    fetchUsers();
  }, [])

    
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Usuários" username="André Souza" />

        <main className="flex-1 flex">
          <div className="grid grid-cols-5 flex-1 gap-4 p-4 bg-slate-400 place-items-start">
            {users && users.map((user) => (
              <UserCard 
                imageSrc="/images/profiles/RafaelRodrigues.png"
                position="Supervisor"
                department="Linha de Montagem"
                name={user.username}
                idProfile="1"
              />
            ))}

          </div>
          
        </main>
      </div>
    </div>
  );
}