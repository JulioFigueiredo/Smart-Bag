import axios from "axios";

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-23.4772271&longitude=-47.5492724&past_days=2&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

export const fetchClimateData = async (): Promise<ClimateData> => {
    try {
        const response = await axios.get(API_URL);

        const { hourly } = response.data;

        return {
            labels: hourly.time.map((time: string) => new Date(time).toLocaleString()),
            datasets: [
                {
                    label: 'Temperatura (ºC)',
                    data: hourly.temperature_2m,
                    borderColor: '#FF8384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Umidade Relativa (%)',
                    data: hourly.relative_humidity_2m,
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Velocidade do Vento (m/s)',
                    data: hourly.wind_speed_10m,
                    borderColor: '#FFCE56',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
        throw error;
    }
};