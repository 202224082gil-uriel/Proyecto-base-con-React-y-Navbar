// src/services/dataServices.js

import apiClient from './apiClient';

// Simulamos un JSON local (puedes cambiarlo por tus propios datos)
const datosSimulados = [
  { id: 1, categoria: "Tecnología", producto: "Laptop HP", ventas: 150, precio: 15000 },
  { id: 2, categoria: "Tecnología", producto: "Mouse Inalámbrico", ventas: 300, precio: 300 },
  { id: 3, categoria: "Oficina", producto: "Silla Gamer", ventas: 50, precio: 4500 },
  { id: 4, categoria: "Oficina", producto: "Escritorio", ventas: 80, precio: 2500 },
  { id: 5, categoria: "Tecnología", producto: "Monitor 24", ventas: 120, precio: 3500 },
];

// 1. Función que simula la petición HTTP
export const obtenerDatosVisualizacion = () => {
  return new Promise((resolve) => {
    // Simulamos un tiempo de carga de 1 segundo
    setTimeout(() => {
      resolve(datosSimulados);
    }, 1000);
  });
};

// 2. Función que procesa y filtra los datos
export const procesarDatos = (datos) => {
  if (!datos || datos.length === 0) return { totalVentas: 0, ingresosTotales: 0, categoriasUnicas: 0, datosFiltrados: [] };

  // Cálculos para las métricas
  const totalVentas = datos.reduce((suma, item) => suma + item.ventas, 0);
  const ingresosTotales = datos.reduce((suma, item) => suma + (item.ventas * item.precio), 0);
  
  // Extraer categorías únicas
  const categoriasUnicas = [...new Set(datos.map(item => item.categoria))].length;

  return {
    totalVentas,
    ingresosTotales,
    categoriasUnicas,
    datosFiltrados: datos // Aquí podrías filtrar si lo requieres
  };
};

// NUEVA FUNCIÓN PARA LA PRÁCTICA 3
export const obtenerPrediccionClimatica = async (latitud, longitud) => {
    try {
        // Hacemos la petición GET usando Axios
        const respuesta = await apiClient.get('/forecast', {
            params: {
                latitude: latitud,
                longitude: longitud,
                current_weather: true,
            }
        });
        
        // Extraemos solo lo que nos interesa (payload limpio)
        const clima = respuesta.data.current_weather;
        return {
            temperatura: clima.temperature,
            viento: clima.windspeed,
            direccionViento: clima.winddirection,
            hora: clima.time
        };
    } catch (error) {
        console.error("Error al consumir la API:", error);
        throw new Error("No se pudo conectar con el servicio de análisis climático.");
    }
};