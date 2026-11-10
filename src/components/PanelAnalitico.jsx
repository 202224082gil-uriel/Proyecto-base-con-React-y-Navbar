// src/components/PanelAnalitico.jsx
import { useState } from 'react';
import { obtenerPrediccionClimatica } from '../services/dataService';
import TarjetaMetrica from './TarjetaMetrica';

const PanelAnalitico = () => {
    // 1. Definimos los estados
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    // 2. Función que dispara la petición
    const analizarDatos = async () => {
        setCargando(true); // Mostrar loading
        setError(null);    // Limpiar errores previos
        setDatos(null);    // Limpiar datos previos

        try {
            // Coordenadas de ejemplo: Ciudad de México
            const resultado = await obtenerPrediccionClimatica(19.4326, -99.1332);
            setDatos(resultado);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false); // Ocultar loading pase lo que pase
        }
    };

    // Estilos básicos
    const estiloBoton = {
        padding: '10px 20px', fontSize: '16px', backgroundColor: '#3498db', 
        color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',
        marginBottom: '20px'
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', border: '2px solid #3498db', borderRadius: '10px' }}>
            <h2 style={{ color: '#2c3e50' }}>🌍 Panel Analítico (API Externa)</h2>
            <p>Obtén datos climáticos en tiempo real consumiendo la API de Open-Meteo.</p>
            
            <button onClick={analizarDatos} style={estiloBoton} disabled={cargando}>
                {cargando ? 'Consultando API...' : 'Iniciar Análisis Climático'}
            </button>

            {/* Renderizado Condicional */}
            {cargando && <p style={{ color: '#f39c12', fontWeight: 'bold' }}>⏳ Analizando datos, por favor espera...</p>}
            
            {error && <p style={{ color: 'red', fontWeight: 'bold', backgroundColor: '#fadbd8', padding: '10px' }}>❌ Error: {error}</p>}

            {datos && (
                <div>
                    <h3>Resultados obtenidos:</h3>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
                        <TarjetaMetrica titulo="Temperatura (°C)" valor={datos.temperatura} />
                        <TarjetaMetrica titulo="Viento (km/h)" valor={datos.viento} />
                        <TarjetaMetrica titulo="Dirección (°)" valor={datos.direccionViento} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanelAnalitico;