import { apiService } from './api.service';

/**
 * Extrae los datos de la respuesta del backend
 * El backend responde con: { statusCode, success, data, timestamp }
 */
const extractData = (response) => {
  return response.data?.data || response.data;
};

/**
 * Servicio para operaciones con Asignaturas
 */
export const asignaturaService = {
  /**
   * Obtener todas las asignaturas
   * @returns {Promise<Array>} Lista de asignaturas
   */
  getAll: async () => {
    const response = await apiService.get('/asignatura');
    return extractData(response);
  },

  /**
   * Obtener una asignatura por ID
   * @param {string} id - UUID de la asignatura
   * @returns {Promise<Object>} Datos de la asignatura
   */
  getById: async (id) => {
    const response = await apiService.get(`/asignatura/${id}`);
    return extractData(response);
  },

  /**
   * Obtener el conteo total de asignaturas
   * @returns {Promise<Object>} {count: number}
   */
  getCount: async () => {
    const response = await apiService.get('/asignatura/count');
    return extractData(response);
  },

  /**
   * Buscar asignaturas por cuatrimestre
   * @param {number} cuatrimestre - Número de cuatrimestre
   * @returns {Promise<Array>} Lista de asignaturas
   */
  getByCuatrimestre: async (cuatrimestre) => {
    const response = await apiService.get(`/asignatura/cuatrimestre/${cuatrimestre}`);
    return extractData(response);
  },

  /**
   * Buscar asignaturas por programa de estudio
   * @param {string} programaId - UUID del programa
   * @returns {Promise<Array>} Lista de asignaturas
   */
  getByPrograma: async (programaId) => {
    const response = await apiService.get(`/asignatura/programa/${programaId}`);
    return extractData(response);
  },

  /**
   * Buscar asignaturas por programa y cuatrimestre
   * @param {string} programaId - UUID del programa
   * @param {number} cuatrimestre - Número de cuatrimestre
   * @returns {Promise<Array>} Lista de asignaturas
   */
  getByProgramaAndCuatrimestre: async (programaId, cuatrimestre) => {
    const response = await apiService.get(`/asignatura/programa/${programaId}/cuatrimestre/${cuatrimestre}`);
    return extractData(response);
  },

  /**
   * Contar asignaturas por programa
   * @param {string} programaId - UUID del programa
   * @returns {Promise<Object>} {count: number}
   */
  getCountByPrograma: async (programaId) => {
    const response = await apiService.get(`/asignatura/programa/${programaId}/count`);
    return extractData(response);
  },

  /**
   * Crear una nueva asignatura
   * @param {Object} asignaturaData - Datos de la asignatura
   * @param {string} asignaturaData.nombre - Nombre de la asignatura
   * @param {number} asignaturaData.cuatrimestre - Cuatrimestre
   * @param {string} asignaturaData.programaEstudioId - UUID del programa
   * @returns {Promise<Object>} Asignatura creada
   */
  create: async (asignaturaData) => {
    const response = await apiService.post('/asignatura', asignaturaData);
    return extractData(response);
  },

  /**
   * Actualizar una asignatura
   * @param {string} id - UUID de la asignatura
   * @param {Object} asignaturaData - Datos a actualizar
   * @returns {Promise<Object>} Asignatura actualizada
   */
  update: async (id, asignaturaData) => {
    const response = await apiService.patch(`/asignatura/${id}`, asignaturaData);
    return extractData(response);
  },

  /**
   * Eliminar una asignatura
   * @param {string} id - UUID de la asignatura
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await apiService.delete(`/asignatura/${id}`);
  }
};
