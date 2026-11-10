// src/services/apiClient.js
import axios from 'axios';

// Leemos la URL base desde las variables de entorno de Vite
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // Si la API tarda más de 10 segundos, lanza error
});

export default apiClient;