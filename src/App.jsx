// src/App.jsx
import { useState, useEffect } from 'react';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';

function App() {
  const [cargando, setCargando] = useState(true);
  const [datosCrudos, setDatosCrudos] = useState([]); 
  const [datosProcesados, setDatosProcesados] = useState({
    totalVentas: 0,
    ingresosTotales: 0,
    categoriasUnicas: 0,
    datosFiltrados: []
  });

  // ESTADO GLOBAL DE FILTROS (Ahora incluye la fecha vacía)
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

  // EFECTO QUE ESCUCHA LOS FILTROS
  useEffect(() => {
    if (datosCrudos.length === 0) return;

    let datosFiltrados = datosCrudos;

    // 1. Filtrar por categoría
    if (filtros.categoria !== 'todas') {
      datosFiltrados = datosFiltrados.filter(d => d.categoria === filtros.categoria);
    }

    // 2. Filtrar por fecha (Si el usuario eligió una fecha)
    if (filtros.fecha !== '') {
      datosFiltrados = datosFiltrados.filter(d => {
          // Compara si la fecha del producto es mayor o igual a la fecha seleccionada
          return new Date(d.fecha) >= new Date(filtros.fecha);
      });
    }

    // Procesamos los datos resultantes (recalcula las métricas)
    const datosListos = procesarDatos(datosFiltrados);
    setDatosProcesados(datosListos);

  }, [filtros, datosCrudos]); 

  if (cargando) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando Dashboard...</h2>;
  }

  return (
    <DashboardLayout sidebar={<PanelFiltros filtros={filtros} setFiltros={setFiltros} />}>
      
      <h1 style={{ margin: 0, color: '#2c3e50' }}>Dashboard de Análisis de Ventas</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <TarjetaMetrica titulo="Ventas Totales" valor={datosProcesados.totalVentas} />
        <TarjetaMetrica titulo="Ingresos Totales" valor={`$${datosProcesados.ingresosTotales}`} />
        <TarjetaMetrica titulo="Categorías Únicas" valor={datosProcesados.categoriasUnicas} />
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Detalle de Productos</h2>
        <TablaDatos datos={datosProcesados.datosFiltrados} />
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
         <PanelAnalitico />
      </div>

    </DashboardLayout>
  );
}

export default App;