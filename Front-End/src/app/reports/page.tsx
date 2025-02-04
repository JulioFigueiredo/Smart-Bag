"use client";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { format } from "date-fns"; // Importar format do date-fns
import ptBR from 'date-fns/locale/pt-BR'; // Importar locale em português para formatação

export default function Report() {
    const [parameters, setParameters] = useState({
        startDate: null,
        endDate: null,
        category: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParameters((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenerateReport = () => {
        alert(`Relatório gerado com os parâmetros:
        - Início: ${parameters.startDate ? format(parameters.startDate, 'dd/MM/yyyy') : "Não especificado"}
        - Fim: ${parameters.endDate ? format(parameters.endDate, 'dd/MM/yyyy') : "Não especificado"}
        - Categoria: ${parameters.category || "Todas as categorias"}`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Relatório Gerado", 10, 10);
        doc.text(`Período: ${parameters.startDate ? format(parameters.startDate, 'dd/MM/yyyy') : "Não especificado"} até ${parameters.endDate ? format(parameters.endDate, 'dd/MM/yyyy') : "Não especificado"}`, 10, 20);
        doc.text(`Categoria: ${parameters.category || "Todas as categorias"}`, 10, 30);
        doc.save("relatorio.pdf");
    };

    const exportToCSV = () => {
        const startDate = parameters.startDate ? format(parameters.startDate, 'dd/MM/yyyy') : "Não especificado";
        const endDate = parameters.endDate ? format(parameters.endDate, 'dd/MM/yyyy') : "Não especificado";
        const csv = `data:text/csv;charset=utf-8,Período Início,Período Fim,Categoria\n${startDate},${endDate},${parameters.category || "Todas as categorias"}`;
        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "relatorio.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header title="Relatórios" username="Pablo Sanches" />
                <main className="p-4">
                    <h1 className="text-2xl text-[#1b3c79] font-semibold mb-4">Relatórios Smart Bag</h1>

                    <form className="mb-6 space-y-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-black">
                                Período - Início
                            </label>
                            <DatePicker
                                selected={parameters.startDate}
                                onChange={(date) => setParameters((prev) => ({ ...prev, startDate: date }))}
                                className="mt-1 p-2 block w-full border text-black border-gray-300 rounded-md"
                                dateFormat="dd/MM/yyyy" // Define o formato de data no DatePicker
                                locale={ptBR} // Define o locale para português do Brasil
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-black">
                                Período - Fim
                            </label>
                            <DatePicker
                                selected={parameters.endDate}
                                onChange={(date) => setParameters((prev) => ({ ...prev, endDate: date }))}
                                className="mt-1 p-2 block w-full border text-black border-gray-300 rounded-md"
                                dateFormat="dd/MM/yyyy" // Define o formato de data no DatePicker
                                locale={ptBR} // Define o locale para português do Brasil
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-black">
                                Categoria de Itens
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={parameters.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                            >
                                <option value="">Todas as categorias</option>
                                <option value="Eletrônicos">Eletrônicos</option>
                                <option value="Livros">Livros</option>
                                <option value="Documentos">Documentos</option>
                                <option value="Alimentos">Alimentos</option>
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleGenerateReport}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Gerar Relatório
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 text-black rounded-md hover:bg-gray-400"
                                onClick={exportToPDF}
                            >
                                Download PDF
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 text-black rounded-md hover:bg-gray-400"
                                onClick={exportToCSV}
                            >
                                Download CSV
                            </button>
                        </div>
                    </form>

                </main>
            </div>
        </div>
    );
}
