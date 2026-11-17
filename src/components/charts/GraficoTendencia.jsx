// src/components/charts/GraficoTendencia.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar los módulos necesarios
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraficoTendencia = ({ labels, values }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Ventas (Unidades)',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Curvatura de la línea
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true, // Se adapta al tamaño del contenedor
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tendencia de Ventas por Producto' },
      tooltip: { enabled: true }, // Interactividad
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoTendencia;