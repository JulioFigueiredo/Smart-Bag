"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState, useEffect } from "react";

// URL base da API
const API_URL = "http://localhost:5041/api/ObjetoStatus";

export default function Management() {
  const [tagName, setTagName] = useState("");
  const [status, setStatus] = useState<boolean>(true); // Status inicial
  const [itens, setItens] = useState<{ id: number; nome: string; status: boolean }[]>([]);

  // Função para buscar itens ao carregar a página
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item: any, index: number) => ({
          id: item.id, // Alterado para garantir que o ID do objeto esteja correto
          nome: item.objeto,
          status: item.status,
        }));
        setItens(formattedData);
      })
      .catch((err) => console.error("Erro ao buscar itens:", err));
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
            throw new Error("Erro ao adicionar o item.");
          }
          return res.json();
        })
        .then((data) => {
          setItens((prevItens) => [
            ...prevItens,
            { id: data.id, nome: tagName, status: status },
          ]);
          setTagName("");
          setStatus(true); // Reseta o status
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Por favor, insira o nome do item.");
    }
  };

  // Função para editar o status de um item
  const handleEditStatus = (id: number, newStatus: boolean) => {
    const itemToEdit = itens.find((item) => item.id === id);
    if (!itemToEdit) return;

    fetch(`${API_URL}/${id}`, {
      method: "PATCH", // Método PATCH para atualização parcial
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus, // Apenas o status será atualizado
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao atualizar o status.");
        }
        return res.json();
      })
      .then(() => {
        setItens((prevItens) =>
          prevItens.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((err) => alert(err.message));
  };

  // Função para remover um item
  const handleRemoveItem = (id: number) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE", // Método DELETE para remover o item
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao remover o item.");
        }
        setItens((prevItens) => prevItens.filter((item) => item.id !== id));
      })
      .catch((err) => alert(err.message));
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
          <div className="w-2/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Lista de Itens</h2>
            {itens.length > 0 ? (
              itens.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 p-4 mb-2 rounded shadow"
                >
                  <span className="text-lg font-medium text-black">{`${item.id}: ${item.nome}`}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-black">
                      Status: {item.status ? "True" : "False"}
                    </span>
                    <button
                      onClick={() => handleEditStatus(item.id, !item.status)}
                      className="bg-[#f59e0b] text-white py-1 px-4 rounded hover:bg-[#d97706]"
                    >
                      Alterar para {item.status ? "False" : "True"}
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-[#e53e3e] text-white py-1 px-4 rounded hover:bg-[#c53030]"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhum item disponível.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
