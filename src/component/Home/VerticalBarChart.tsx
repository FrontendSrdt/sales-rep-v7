import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
 
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
 
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
           
           
        },
    },
};
 
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
 
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [500, 300, 700, 200, 800, 400, 600], // Dummy data for Dataset 1
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [400, 600, 300, 800, 200, 700, 500], // Dummy data for Dataset 2
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
 
const VerticalBarChart: React.FC = () => {
    return <Bar options={options} data={data} />;
}
 
export default VerticalBarChart;