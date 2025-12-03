import { apiService } from './api.service';

/**
 * Extrae los datos de la respuesta del backend
 * El backend responde con: { statusCode, success, data, timestamp }
 */
const extractData = (response) => {
  return response.data?.data || response.data;
};

/**
 * Servicio para operaciones con Programas de Estudio
 */
export const programaEstudioService = {
  /**
   * Obtener todos los programas de estudio
   * @returns {Promise<Array>} Lista de programas
   */
  getAll: async () => {
    const response = await apiService.get('/programa-estudio');
    return extractData(response);
  },

  /**
   * Obtener un programa de estudio por ID
   * @param {string} id - UUID del programa
   * @returns {Promise<Object>} Datos del programa
   */
  getById: async (id) => {
    const response = await apiService.get(`/programa-estudio/${id}`);
    return extractData(response);
  },

  /**
   * Obtener el conteo total de programas
   * @returns {Promise<Object>} {count: number}
   */
  getCount: async () => {
    const response = await apiService.get('/programa-estudio/count');
    return extractData(response);
  },

  /**
   * Crear un nuevo programa de estudio
   * @param {Object} programaData - Datos del programa
   * @param {string} programaData.nombre - Nombre del programa
   * @param {number} programaData.cantidadCuatrimestres - Cantidad de cuatrimestres
   * @returns {Promise<Object>} Programa creado
   */
  create: async (programaData) => {
    const response = await apiService.post('/programa-estudio', programaData);
    return extractData(response);
  },

  /**
   * Actualizar un programa de estudio
   * @param {string} id - UUID del programa
   * @param {Object} programaData - Datos a actualizar
   * @returns {Promise<Object>} Programa actualizado
   */
  update: async (id, programaData) => {
    const response = await apiService.patch(`/programa-estudio/${id}`, programaData);
    return extractData(response);
  },

  /**
   * Eliminar un programa de estudio
   * @param {string} id - UUID del programa
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await apiService.delete(`/programa-estudio/${id}`);
  }
};
