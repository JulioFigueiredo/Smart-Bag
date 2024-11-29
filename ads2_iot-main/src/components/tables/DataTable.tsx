"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Perfomance {
    id: number;
    object: string;
    status: string;
}

export default function DashDataTable() {
    const [performance, setPerfomance] = useState<Perfomance[]>([]);

    useEffect(() => {
        const data: Perfomance[] = [
            { id: 1, object: "Notebook",  status: "Dentro",},
            { id: 2, object: "Tablet",  status: "Fora"},
            { id: 3, object: "Celular",  status: "Fora"},
            { id: 4, object: "Fone de Ouvido",  status: "Dentro"},
            { id: 5, object: "Carregador",   status: "Dentro"},
            { id: 6, object: "Caderno",  status: "Dentro"},
            { id: 7, object: "Blusa",  status: "Fora"},
            { id: 8, object: "Chaves",  status: "Fora"},
            { id: 9, object: "Estojo",  status: "Dentro"},
            { id: 10, object: "Garrafinha",  status: "Fora"},
        ];

        setPerfomance(data);
    }, []);

    return (
        <DataTable value={performance}>            
            <Column field="id" header="Id"></Column>
            <Column field="object" header="Objeto"></Column>
            <Column field="status" header="Status"></Column>
        </DataTable>
    );
}
        