// src/components/TarjetaMetrica.jsx
import React from 'react';

const TarjetaMetrica = ({ titulo, valor }) => {
  // Estilos básicos en línea para que se vea como tarjeta
  const estiloTarjeta = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    minWidth: '150px'
  };

  return (
    <div style={estiloTarjeta}>
      <h3 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '16px' }}>{titulo}</h3>
      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>{valor}</p>
    </div>
  );
};

export default TarjetaMetrica;