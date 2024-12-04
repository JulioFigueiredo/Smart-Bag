"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState } from "react";

export default function Management() {
  const [tag, setTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [tagId, setTagId] = useState("");
  const [tagName, setTagName] = useState("");

  // Lista de itens inicializada vazia
  const [itens, setItens] = useState<{ id: number; nome: string }[]>([]);

  // Tags existentes
  const existingTags = ["123", "456"];

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleConfirmTag = () => {
    if (tag) {
      if (existingTags.includes(tag)) {
        setModalType("edit");
        setIsModalOpen(true);
        setTagId(tag);
        setTagName("");
      } else {
        alert("Tag não encontrada. Por favor, insira uma tag existente ou adicione uma nova.");
      }
    } else {
      alert("Por favor, insira um ID de tag.");
    }
  };

  const handleAddNewTag = () => {
    setModalType("add");
    setIsModalOpen(true);
    setTagId("");
    setTagName("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTagId("");
    setTagName("");
  };

  const handleSaveTag = () => {
    if (tagId && tagName) {
      // Adiciona o item correspondente à tag
      const newItem = { id: itens.length + 1, nome: tagName };
      setItens((prevItens) => [...prevItens, newItem]);

      alert(
        modalType === "add"
          ? `Nova tag salva: ID: ${tagId}, Nome: ${tagName}`
          : `Tag \"${tagId}\" atualizada para: ${tagName}`
      );
      closeModal();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const editarItem = (id: number) => {
    const novoNome = prompt("Digite o novo nome do item:");
    if (novoNome) {
      setItens((prevItens) =>
        prevItens.map((item) =>
          item.id === id ? { ...item, nome: novoNome } : item
        )
      );
    }
  };

  const excluirItem = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      setItens((prevItens) => prevItens.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header title="Gerenciamento de Tags e Itens" username="Pablo Sanches" />
        <main className="flex flex-col items-center justify-center h-full">
          {/* Seção de Tags */}
          <div className="w-2/3 mb-8">
            <h2 className="text-xl text-[#1b3c79] font-semibold mb-4">Adicionar/Editar Tag</h2>
            <div className="mb-4">
              <label htmlFor="tag" className="block mb-2 text-black">
                ID da Tag:
              </label>
              <input
                type="text"
                id="tag"
                value={tag}
                onChange={handleTagChange}
                className="text-black w-full p-2 border border-gray-300 rounded"
                placeholder="Digite o ID da tag"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setTag("")}
                className="bg-[#ff2f2f] text-white py-2 px-6 rounded hover:bg-[#d42727]"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmTag}
                className="bg-[#1f458d] text-white py-2 px-6 rounded hover:bg-[#4e6fae]"
              >
                Confirmar
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleAddNewTag}
                className="bg-[#4b8aff] text-white py-2 px-6 rounded hover:bg-[#4e6fae]"
              >
                Adicionar Nova Tag
              </button>
            </div>
          </div>

          {/* Seção de Itens */}
          <div className="w-2/3">
            <h2 className="text-xl font-semibold mb-4 text-black">Lista de Itens</h2>
            {itens.length > 0 ? (
              itens.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 p-4 mb-2 rounded shadow"
                >
                  <span className="text-lg font-medium text-black">{`${item.id}: ${item.nome}`}</span>
                  <div>
                    <button
                      onClick={() => editarItem(item.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhum item disponível.</p>
            )}
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-6 w-1/3">
              <h3 className="text-xl font-semibold text-black mb-4">
                {modalType === "add" ? "Adicionar Nova Tag" : "Editar Nome da Tag"}
              </h3>
              {modalType === "add" && (
                <div className="mb-4">
                  <label htmlFor="newTagId" className="block mb-2 text-black">
                    ID da Tag:
                  </label>
                  <input
                    type="text"
                    id="newTagId"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                    className="text-black w-full p-2 border border-gray-300 rounded"
                    placeholder="Digite o ID da nova tag"
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="tagName" className="block mb-2 text-black">
                  Nome do Item da Tag:
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
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-[#ff2f2f] text-white py-2 px-6 rounded hover:bg-[#d42727]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveTag}
                  className="bg-[#1f458d] text-white py-2 px-6 rounded hover:bg-[#4e6fae]"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
