// src/App.jsx
import { useState, useEffect } from 'react';
import { obtenerDatosVisualizacion, procesarDatos, formatearParaGrafico } from './services/dataService';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';
import GraficoTendencia from './components/charts/GraficoTendencia'; // NUEVO
import GraficoComparativo from './components/charts/GraficoComparativo'; // NUEVO

function App() {
  const [cargando, setCargando] = useState(true);
  const [datosCrudos, setDatosCrudos] = useState([]); 
  const [datosProcesados, setDatosProcesados] = useState({
    totalVentas: 0,
    ingresosTotales: 0,
    categoriasUnicas: 0,
    datosFiltrados: []
  });

  // Estado para los gráficos
  const [datosGrafico, setDatosGrafico] = useState({ labels: [], values: [] });

  const [filtros, setFiltros] = useState({ categoria: 'todas', fecha: '' });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerDatosVisualizacion();
        setDatosCrudos(datos);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (datosCrudos.length === 0) return;

    let datosFiltrados = datosCrudos;

    if (filtros.categoria !== 'todas') {
      datosFiltrados = datosFiltrados.filter(d => d.categoria === filtros.categoria);
    }

    if (filtros.fecha !== '') {
      datosFiltrados = datosFiltrados.filter(d => new Date(d.fecha) >= new Date(filtros.fecha));
    }

    const datosListos = procesarDatos(datosFiltrados);
    setDatosProcesados(datosListos);

    // NUEVO: Formatear los datos filtrados para los gráficos
    const datosParaChart = formatearParaGrafico(datosFiltrados);
    setDatosGrafico(datosParaChart);

  }, [filtros, datosCrudos]); 

  if (cargando) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando Dashboard...</h2>;
  }

  return (
    <DashboardLayout sidebar={<PanelFiltros filtros={filtros} setFiltros={setFiltros} />}>
      
      <h1 style={{ margin: 0, color: '#2c3e50' }}>Dashboard de Análisis de Ventas</h1>

      {/* Tarjetas Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <TarjetaMetrica titulo="Ventas Totales" valor={datosProcesados.totalVentas} />
        <TarjetaMetrica titulo="Ingresos Totales" valor={`$${datosProcesados.ingresosTotales}`} />
        <TarjetaMetrica titulo="Categorías Únicas" valor={datosProcesados.categoriasUnicas} />
      </div>

      {/* NUEVOS GRÁFICOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <GraficoTendencia labels={datosGrafico.labels} values={datosGrafico.values} />
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <GraficoComparativo labels={datosGrafico.labels} values={datosGrafico.values} />
        </div>
      </div>

      {/* Tabla */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Detalle de Productos</h2>
        <TablaDatos datos={datosProcesados.datosFiltrados} />
      </div>

      {/* Panel Analítico API Externa */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
         <PanelAnalitico />
      </div>

    </DashboardLayout>
  );
}

export default App;