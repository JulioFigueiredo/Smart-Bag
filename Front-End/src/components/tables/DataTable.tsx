'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Performance {
    objeto: string;
    status: boolean;
}

interface DashDataTableProps {
    onUpdateTotal: (total: number) => void; // Callback para atualizar o total
}

export default function DashDataTable({ onUpdateTotal }: DashDataTableProps) {
    const [performance, setPerformance] = useState<Performance[]>([]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const response = await fetch('http://localhost:5041/api/objetostatus');
                if (response.ok) {
                    const data = await response.json();
                    setPerformance(data);
                    onUpdateTotal(data.length); // Atualiza o total de itens
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPerformanceData();
    }, [onUpdateTotal]); // Dependência para evitar reexecuções desnecessárias

    const statusBodyTemplate = (rowData: Performance) => {
        return (
            <span
                style={{
                    backgroundColor: rowData.status ? 'green' : 'red',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                }}
            >
                {rowData.status ? 'Dentro' : 'Fora'}
            </span>
        );
    };

    return (
        <div>
            <DataTable value={performance}>
                <Column field="objeto" header="Objeto" />
                <Column field="status" header="Status" body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}
