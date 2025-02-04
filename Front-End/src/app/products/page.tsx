"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState, useEffect } from "react";

// URL base da API
const API_URL = "http://localhost:5041/api/ObjetoStatus";

export default function Management() {
  const [tagName, setTagName] = useState("");
  const [status, setStatus] = useState<boolean>(true);
  const [itens, setItens] = useState<{ nome: string; status: boolean }[]>([]);

  // Função para buscar itens ao carregar a página
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao buscar itens: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          nome: item.objeto,
          status: item.status,
        }));
        setItens(formattedData);
      })
      .catch((err) => console.error(err.message));
  }, []);

  // Função para adicionar um novo item
  const handleAddItem = () => {
    if (tagName.trim()) {
      const newItem = {
        objeto: tagName,
        status: status,
      };

      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro ao adicionar o item: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then(() => {
          setItens((prevItens) => [
            ...prevItens,
            { nome: tagName, status: status },
          ]);
          setTagName("");
          setStatus(true);
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Por favor, insira o nome do item.");
    }
  };

  // Função para editar o status de um item usando o nome
  const handleEditStatus = (nome: string, newStatus: boolean) => {
    const updatedItem = {
      objeto: nome,
      status: newStatus,
    };

    fetch(`${API_URL}/${encodeURIComponent(nome)}`, { // Codificando o nome para a URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao atualizar o status: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        setItens((prevItens) =>
          prevItens.map((item) =>
            item.nome === nome ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((err) => alert(err.message));
  };

  // Função para remover um item usando o nome
  const handleRemoveItem = (nome: string) => {
    fetch(`${API_URL}/${encodeURIComponent(nome)}`, { // Codificando o nome para a URL
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao remover o item: ${res.status} ${res.statusText}`);
        }
        setItens((prevItens) => prevItens.filter((item) => item.nome !== nome));
      })
      .catch((err) => alert(err.message));
  };

  // Função para editar o status via prompt
  const handleStatusPrompt = () => {
    const nome = prompt("Digite o nome do item que deseja editar o status:");
    if (nome) {
      const item = itens.find((item) => item.nome === nome);
      if (item) {
        const newStatus = confirm("Deseja alterar o status para 'True'?") ? true : false;
        handleEditStatus(nome, newStatus);
      } else {
        alert("Item não encontrado.");
      }
    }
  };

  // Função para remover item via prompt
  const handleRemovePrompt = () => {
    const nome = prompt("Digite o nome do item que deseja remover:");
    if (nome) {
      const item = itens.find((item) => item.nome === nome);
      if (item) {
        if (confirm(`Tem certeza que deseja remover o item "${nome}"?`)) {
          handleRemoveItem(nome);
        }
      } else {
        alert("Item não encontrado.");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="flex flex-col items-center justify-center h-full">
          <div className="w-2/3 mb-8">
            <h2 className="text-xl text-[#1b3c79] font-semibold mb-4">Adicionar Novo Item</h2>
            <div className="mb-4">
              <label htmlFor="tagName" className="block mb-2 text-black">
                Nome do Item:
              </label>
              <input
                type="text"
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="text-black w-full p-2 border border-gray-300 rounded"
                placeholder="Digite o nome do item"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block mb-2 text-black">
                Status:
              </label>
              <select
                id="status"
                value={status ? "true" : "false"}
                onChange={(e) => setStatus(e.target.value === "true")}
                className="text-black w-full p-2 border border-gray-300 rounded"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button
              onClick={handleAddItem}
              className="bg-[#4b8aff] text-white py-2 px-6 rounded hover:bg-[#4e6fae]"
            >
              Adicionar Item
            </button>
          </div>
          <div className="w-2/3 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Lista de Itens</h2>
            {itens.length > 0 ? (
              <div className="space-y-4">
                {itens.map((item) => (
                  <div
                    key={item.nome} // Agora usamos 'nome' como chave
                    className="flex items-center justify-between bg-gray-100 p-4 mb-2 rounded shadow"
                  >
                    <span className="text-lg font-medium text-black">{`${item.nome}: ${item.status ? "True" : "False"}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum item disponível.</p>
            )}
          </div>

          {/* Botões de editar status e remover item */}
          <div className="flex space-x-4">
            <button
              onClick={handleStatusPrompt}
              className="bg-[#15466d] text-white py-2 px-6 rounded hover:bg-[#123450]"
            >
              Editar Status
            </button>
            <button
              onClick={handleRemovePrompt}
              className="bg-[#e53e3e] text-white py-2 px-6 rounded hover:bg-[#c53030]"
            >
              Remover Item
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
