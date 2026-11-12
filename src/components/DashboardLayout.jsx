// src/components/DashboardLayout.jsx
import React from 'react';

const DashboardLayout = ({ sidebar, children }) => {
    // Estilos con CSS Grid
    const layoutStyle = {
        display: 'grid',
        gridTemplateColumns: '250px 1fr', // 250px para el menú, el resto para el contenido
        minHeight: '100vh',
        backgroundColor: '#f4f6f9'
    };

    const sidebarStyle = {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const mainContentStyle = {
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px', // Espacio entre tarjetas, gráficos y tablas
        overflowY: 'auto'
    };

    // Estilos responsivos (para que en celular se vea uno abajo del otro)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        layoutStyle.gridTemplateColumns = '1fr'; // Una sola columna en móviles
    }

    return (
        <div style={layoutStyle}>
            {/* Barra Lateral */}
            <aside style={sidebarStyle}>
                <h2>Filtros</h2>
                {sidebar}
            </aside>

            {/* Área Principal */}
            <main style={mainContentStyle}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;