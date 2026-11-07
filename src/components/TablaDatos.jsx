// src/components/TablaDatos.jsx
import React from 'react';

const TablaDatos = ({ datos }) => {
  const estiloTabla = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const estiloCelda = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left'
  };

  const estiloCabecera = {
    ...estiloCelda,
    backgroundColor: '#2c3e50',
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <table style={estiloTabla}>
      <thead>
        <tr>
          <th style={estiloCabecera}>ID</th>
          <th style={estiloCabecera}>Categoría</th>
          <th style={estiloCabecera}>Producto</th>
          <th style={estiloCabecera}>Ventas</th>
          <th style={estiloCabecera}>Precio</th>
        </tr>
      </thead>
      <tbody>
        {/* Renderizado dinámico con .map() */}
        {datos.map((item) => (
          <tr key={item.id}>
            <td style={estiloCelda}>{item.id}</td>
            <td style={estiloCelda}>{item.categoria}</td>
            <td style={estiloCelda}>{item.producto}</td>
            <td style={estiloCelda}>{item.ventas}</td>
            <td style={estiloCelda}>${item.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaDatos;