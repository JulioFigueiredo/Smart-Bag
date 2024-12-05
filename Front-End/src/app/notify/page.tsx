"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState } from "react";

export default function Notify() {
    const [alerts, setAlerts] = useState([
        { id: 1, time: "08:00", priority: "high" },
        { id: 2, time: "12:00", priority: "medium" },
        { id: 3, time: "18:00", priority: "low" },
    ]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTime, setNewTime] = useState("");
    const [newAlertTime, setNewAlertTime] = useState("");
    const [newAlertPriority, setNewAlertPriority] = useState("low");

    const handleEdit = (id: number) => {
        const alertToEdit = alerts.find((alert) => alert.id === id);
        if (alertToEdit) {
            setEditingId(id);
            setNewTime(alertToEdit.time);
        }
    };

    const handleSave = () => {
        setAlerts((prevAlerts) =>
            prevAlerts.map((alert) =>
                alert.id === editingId ? { ...alert, time: newTime } : alert
            )
        );
        setEditingId(null);
        setNewTime("");
    };

    const handleCancel = () => {
        setEditingId(null);
        setNewTime("");
    };

    const handleArchive = (id: number) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    const handleAddAlert = () => {
        const newAlert = {
            id: Date.now(),
            time: newAlertTime || "00:00",
            priority: newAlertPriority,
        };
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
        setNewAlertTime("");
        setNewAlertPriority("low");
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header title="Alertas Gerais" username="Pablo Sanches" />
                <main className="p-4">
                    <h1 className="text-[#1b3c79] text-xl font-bold mb-4">Gerenciamento de Alertas</h1>

                    {/* Formulário para adicionar um novo alerta */}
                    <div className="mb-6 p-4 border rounded shadow bg-gray-100">
                        <h2 className="text-black font-bold mb-2">Adicionar Novo Alerta</h2>
                        <div className="flex items-center space-x-4">
                            <input
                                type="time"
                                value={newAlertTime}
                                onChange={(e) => setNewAlertTime(e.target.value)}
                                className="border p-2 rounded text-black"
                            />
                            <select
                                value={newAlertPriority}
                                onChange={(e) => setNewAlertPriority(e.target.value)}
                                className="border p-2 rounded text-black"
                            >
                                <option value="high">Alta</option>
                                <option value="medium">Média</option>
                                <option value="low">Baixa</option>
                            </select>
                            <button
                                onClick={handleAddAlert}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>

                    {/* Lista de alertas */}
                    <ul className="text-black space-y-4">
                        {alerts.map((alert) => (
                            <li
                                key={alert.id}
                                className={`p-4 rounded shadow ${
                                    alert.priority === "high"
                                        ? "bg-red-200"
                                        : alert.priority === "medium"
                                        ? "bg-yellow-200"
                                        : "bg-green-200"
                                }`}
                            >
                                {editingId === alert.id ? (
                                    <div>
                                        <p className="font-bold text-black">Editando horário</p>
                                        <input
                                            type="time"
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                            className="text-black border p-2 rounded w-full"
                                        />
                                        <div className="flex mt-2 space-x-2">
                                            <button
                                                onClick={handleSave}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-[#858585] text-white px-4 py-2 rounded"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-bold">Horário: {alert.time}</p>
                                        <p>Prioridade: {alert.priority}</p>
                                        <div className="flex mt-2 space-x-2">
                                            <button
                                                onClick={() => handleEdit(alert.id)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleArchive(alert.id)}
                                                className="bg-[#1f458d] text-white px-4 py-2 rounded"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
}
