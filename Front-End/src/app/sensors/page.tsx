"use client";
import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Componente DataInput
function DataInput({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-black">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 p-2 block w-full border border-black rounded-md"
            />
        </div>
    );
}

// Componente Form
function Form({ onSubmit }: { onSubmit: (data: { sensorName: string; sensorValue: string }) => void }) {
    const [sensorName, setSensorName] = useState("");
    const [sensorValue, setSensorValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ sensorName, sensorValue });
        setSensorName("");
        setSensorValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="text-black p-4 border border-black rounded-md">
            <h2 className="text-black text-lg font-semibold mb-4">Entrada de Dados</h2>
            <DataInput label="Nome do Sensor" value={sensorName} onChange={setSensorName} />
            <DataInput label="Valor do Sensor" value={sensorValue} onChange={setSensorValue} />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-2"
            >
                Enviar Dados
            </button>
        </form>
    );
}

// Componente StatusIcon
function StatusIcon({ online }: { online: boolean }) {
    return online ? (
        <FaCheckCircle className="text-green-500" />
    ) : (
        <FaTimesCircle className="text-red-500" />
    );
}

// Componente SensorMonitor
function SensorMonitor({
    sensors,
    onEdit,
    onDelete,
}: {
    sensors: { name: string; value: string; online: boolean }[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}) {
    return (
        <div className="text-black p-4 border border-black rounded-md mt-4">
            <h2 className="text-black font-semibold mb-4">Monitoramento de Sensores</h2>
            <table className="w-full border-collapse border border-black">
                <thead>
                    <tr>
                        <th className="text-black border border-black p-2">Sensor</th>
                        <th className="text-black border border-black p-2">Valor</th>
                        <th className="text-black border border-black p-2">Status</th>
                        <th className="text-black border border-black p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sensors.map((sensor, index) => (
                        <tr key={index}>
                            <td className="border border-black p-2">{sensor.name}</td>
                            <td className="border border-black p-2">{sensor.value}</td>
                            <td className="border border-black p-2 text-center">
                                <StatusIcon online={sensor.online} />
                            </td>
                            <td className="border border-black p-2 text-center">
                                <button
                                    onClick={() => onEdit(index)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(index)}
                                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Componente Principal
export default function App() {
    const [sensors, setSensors] = useState<
        { name: string; value: string; online: boolean }[]
    >([]);

    const handleFormSubmit = (data: { sensorName: string; sensorValue: string }) => {
        const isOnline = Math.random() > 0.5; // Simula status aleatório
        setSensors((prev) => [
            ...prev,
            { name: data.sensorName, value: data.sensorValue, online: isOnline },
        ]);
    };

    const handleEditSensor = (index: number) => {
        const updatedName = prompt("Atualizar nome do sensor:", sensors[index].name);
        const updatedValue = prompt("Atualizar valor do sensor:", sensors[index].value);

        if (updatedName !== null && updatedValue !== null) {
            setSensors((prev) =>
                prev.map((sensor, i) =>
                    i === index ? { ...sensor, name: updatedName, value: updatedValue } : sensor
                )
            );
        }
    };

    const handleDeleteSensor = (index: number) => {
        if (confirm("Deseja realmente excluir este sensor?")) {
            setSensors((prev) => prev.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <Header />
                <h1 className="text-[#1b3c79] text-2xl font-bold mb-6">Sistema de Monitoramento de Sensores</h1>
                <Form onSubmit={handleFormSubmit} />
                <SensorMonitor
                    sensors={sensors}
                    onEdit={handleEditSensor}
                    onDelete={handleDeleteSensor}
                />
            </div>
        </div>
    );
}
