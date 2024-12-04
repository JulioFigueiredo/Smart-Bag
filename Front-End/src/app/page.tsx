"use client";

import React, { useState } from "react";
import Card from "@/components/cards/Card";
import DashDataTable from "@/components/tables/DataTable";
import LineChart from "@/components/charts/LineChart";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0); // Total de itens inicializado com 0

  const handleUpdateTotal = (total: number) => {
    setTotalItems(total); // Atualiza o total de itens
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Página Inicial" username="Pablo Sanches" />
        <main className="p-4 flex-1 flex flex-col">
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
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
