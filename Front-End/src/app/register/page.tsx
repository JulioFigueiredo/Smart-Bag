"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Register() {

    const router = useRouter()

    const [formData, setFormData] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    );
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.username || !formData.email || !formData.password) {
            setError("Todos os campos são obrigatórios")
        } else {
            setError("")
            // registrando
            const url = 'https://profandresouza.pythonanywhere.com/api/users/register/'
            await axios.post(
                url, formData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                    router.push('/login')
                }
            ).catch((error) => {
                    setError(JSON.stringify(error.response.data))
                }
            );

        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white shadow-md rounded-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar</h2>

                <label className="block mb-4">
                <span className="text-gray-700">Username</span>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                </label>

                <label className="block mb-4">
                <span className="text-gray-700">Email</span>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                </label>

                <label className="block mb-4">
                <span className="text-gray-700">Password</span>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                </label>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
                >
                Registrar
                </button>
            </form>
            </div>
    );
}