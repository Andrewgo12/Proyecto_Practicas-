const API_URL = 'http://localhost:5000/api';  // Asegúrate de actualizar la URL según tu backend

// Función para realizar peticiones con autenticación
const apiClient = async (endpoint, method = 'GET', data = null) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
        throw new Error('Error en la petición');
    }

    return response.json();
};

export default apiClient;
