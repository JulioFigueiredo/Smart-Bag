import { Chart } from "primereact/chart";
import React from "react";

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
}

interface ClimateDataProps {
    labels: string[];
    datasets: Dataset[];
    xlabel: string;
    ylabel: string;
}

const ClimateChart: React.FC<ClimateDataProps> = ({labels, datasets, xlabel, ylabel}) => {
    const data = {labels, datasets}
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xlabel
                },
            },            
            y: {
                title: {
                    display: true,
                    text: ylabel
                },
            },
            
        }
    }

    return (
        <Chart type="line" data={data} options={options} />
    );

}

export default ClimateChart;
