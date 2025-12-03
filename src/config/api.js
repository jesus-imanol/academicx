/**
 * Configuración centralizada de la API
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://44.194.82.44:3000',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  // Alumnos
  alumnos: {
    base: '/alumno',
    byId: (id) => `/alumno/${id}`,
    byMatricula: (matricula) => `/alumno/matricula/${matricula}`,
    byCuatrimestre: (cuatrimestre) => `/alumno/cuatrimestre/${cuatrimestre}`,
    count: '/alumno/count',
  },
  // Aquí se pueden agregar más endpoints (profesores, grupos, etc.)
};
