import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>Dashboard de Ciencia de Datos</h2>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Uriel Alejandro Gil Morales</p>
    </nav>
  );
};

export default Navbar;