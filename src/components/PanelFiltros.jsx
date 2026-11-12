// src/components/PanelFiltros.jsx
import React from 'react';

const PanelFiltros = ({ filtros, setFiltros }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros({
            ...filtros,
            [name]: value
        });
    };

    const estiloInput = {
        width: '100%', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '20px'
    };

    return (
        <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Filtrar por Categoría:</label>
            <select name="categoria" value={filtros.categoria} onChange={handleChange} style={estiloInput}>
                <option value="todas">Todas las categorías</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Oficina">Oficina</option>
            </select>

            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Ventas a partir de:</label>
            <input 
                type="date" 
                name="fecha" 
                value={filtros.fecha} 
                onChange={handleChange} 
                style={estiloInput}
            />
        </div>
    );
};

export default PanelFiltros;