// src/App.jsx
import { useState, useEffect } from 'react';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico'; 

function App() {
  // Estados para manejar los datos crudos y los procesados
  const [cargando, setCargando] = useState(true);
  const [datosProcesados, setDatosProcesados] = useState({
    totalVentas: 0,
    ingresosTotales: 0,
    categoriasUnicas: 0,
    datosFiltrados: []
  });

  // Hook useEffect para ejecutar la petición al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Obtenemos los datos del servicio
        const datosCrudos = await obtenerDatosVisualizacion();
        
        // 2. Los procesamos
        const datosListos = procesarDatos(datosCrudos);
        
        // 3. Actualizamos el estado
        setDatosProcesados(datosListos);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setCargando(false);
      }
    };

    cargarDatos();
  }, []); // El arreglo vacío indica que solo se ejecute una vez al montar

  if (cargando) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando datos...</h2>;
  }

  // Estilos para la estructura principal
  const contenedorMetricas = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap'
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Dashboard de Análisis de Ventas</h1>
      
      {/* 1. Sección de Tarjetas Métricas (Práctica 2) */}
      <div style={contenedorMetricas}>
        <TarjetaMetrica titulo="Ventas Totales" valor={datosProcesados.totalVentas} />
        <TarjetaMetrica titulo="Ingresos Totales" valor={`$${datosProcesados.ingresosTotales}`} />
        <TarjetaMetrica titulo="Categorías Únicas" valor={datosProcesados.categoriasUnicas} />
      </div>

      {/* 2. Sección de Tabla (Práctica 2) */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#2c3e50' }}>Detalle de Productos</h2>
        <TablaDatos datos={datosProcesados.datosFiltrados} />
      </div>

      {/* 3. NUEVO COMPONENTE: Panel Analítico con API Externa (Práctica 3) */}
      <PanelAnalitico />

    </div>
  );
}

export default App;