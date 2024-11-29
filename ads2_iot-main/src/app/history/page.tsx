import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import React from "react";

export default function Report() {
    return (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header title="IoT" username="André Souza" />
            <main>
              <h1>Histórico de Produção</h1>

                Filtros para selecionar data, etapa de produção, máquina, e período.<br />
                Tabela com registros históricos de produção, tempo de ciclo, taxa de defeitos, e consumo de energia.<br />
                Gráficos de evolução ao longo do tempo para analisar a performance histórica.<br />
                Botão para exportar dados históricos em formato CSV ou PDF.

            </main>
          </div>
        </div>
    );
}
