"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/cards/Card";
import DashDataTable from "@/components/tables/DataTable";
import LineChart from "@/components/charts/LineChart";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0); // Total de itens inicializado com 0
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const handleUpdateTotal = (total: number) => {
    setTotalItems(total); // Atualiza o total de itens
  };

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Formata a data e hora
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Página Inicial" username="Pablo Sanches" />
        <main className="p-4 flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
            {/* Card de Horário e Data */}
            <Card bgcolor="bg-white" className="shadow-lg">
              <div className="flex flex-col items-center justify-center h-full">
                <i className="pi pi-calendar text-5xl px-4 text-blue-500"></i>
                <div className="text-2xl text-black mt-4">
                  <span>{currentDateTime}</span>
                </div>
              </div>
            </Card>

            {/* Card de Informações do Sistema */}
            <Card bgcolor="bg-white" className="shadow-lg">
              <div className="flex flex-col items-center justify-center h-full">
                <i className="pi pi-server text-5xl px-4 text-green-500"></i>
                <div className="text-xl text-black mt-4">
                  <span>Informações do Sistema</span>
                  <p className="text-sm text-gray-500">Sistema em funcionamento</p>
                </div>
              </div>
            </Card>

            {/* Card de Últimas Atualizações */}
            <Card bgcolor="bg-white" className="shadow-lg">
              <div className="flex flex-col items-center justify-center h-full">
                <i className="pi pi-clock text-5xl px-4 text-yellow-500"></i>
                <div className="text-xl text-black mt-4">
                  <span>Últimas Atualizações</span>
                  <p className="text-sm text-gray-500">Nenhuma atualização recente</p>
                </div>
              </div>
            </Card>

            {/* Card de Total de Itens (Posicionado à extrema direita) */}
            <Card bgcolor="bg-white" className="shadow-lg">
              <div className="flex items-center gap-8">
                <i className="pi pi-cog text-5xl px-4 red-icon"></i>
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-black">‎ </span>
                  <span className="text-2xl text-black">
                    Total de itens: <br />
                    {totalItems}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
            <div className="shadow-lg rounded-lg">
              <Card
                header={<span className="text-black">Última Semana: Sensores por Itens</span>}
                bgcolor="bg-white"
              >
                <div className="bg-white text-black">
                  <LineChart />
                </div>
              </Card>
            </div>

            <div className="shadow-lg rounded-lg">
              <Card header={<span className="text-black">Tabela de Itens</span>} bgcolor="bg-white">
                <div className="bg-white text-black">
                  <DashDataTable onUpdateTotal={handleUpdateTotal} />
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
