"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    // Simulação de autenticação simples
    if (username === "admin" && password === "123") {
      setError(null);
      router.push("/"); // Redireciona para a página principal
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nome de Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=" text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Digite seu usuário"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Digite sua senha"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
