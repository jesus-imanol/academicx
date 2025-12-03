import { apiService } from './api.service';

/**
 * Extrae los datos de la respuesta del backend
 * El backend responde con: { statusCode, success, data, timestamp }
 */
const extractData = (response) => {
  return response.data?.data || response.data;
};

/**
 * Servicio para operaciones con Docentes
 */
export const docenteService = {
  /**
   * Obtener todos los docentes
   * @returns {Promise<Array>} Lista de docentes ordenados alfabéticamente
   */
  getAll: async () => {
    const response = await apiService.get('/docente');
    return extractData(response);
  },

  /**
   * Obtener un docente por ID
   * @param {string} id - UUID del docente
   * @returns {Promise<Object>} Datos del docente con competencias y relaciones
   */
  getById: async (id) => {
    const response = await apiService.get(`/docente/${id}`);
    return extractData(response);
  },

  /**
   * Obtener el conteo total de docentes
   * @returns {Promise<Object>} {count: number}
   */
  getCount: async () => {
    const response = await apiService.get('/docente/count');
    return extractData(response);
  },

  /**
   * Buscar docentes por competencia en asignatura
   * @param {string} asignaturaId - UUID de la asignatura
   * @returns {Promise<Array>} Lista de docentes competentes
   */
  getByAsignatura: async (asignaturaId) => {
    const response = await apiService.get(`/docente/asignatura/${asignaturaId}`);
    return extractData(response);
  },

  /**
   * Crear un nuevo docente
   * @param {Object} docenteData - Datos del docente
   * @param {string} docenteData.nombre - Nombre completo del docente
   * @param {Array<string>} docenteData.asignaturasCompetenciaIds - IDs de asignaturas (opcional)
   * @returns {Promise<Object>} Docente creado
   */
  create: async (docenteData) => {
    const response = await apiService.post('/docente', docenteData);
    return extractData(response);
  },

  /**
   * Actualizar un docente existente
   * @param {string} id - UUID del docente
   * @param {Object} docenteData - Datos a actualizar
   * @returns {Promise<Object>} Docente actualizado
   */
  update: async (id, docenteData) => {
    const response = await apiService.patch(`/docente/${id}`, docenteData);
    return extractData(response);
  },

  /**
   * Eliminar un docente
   * @param {string} id - UUID del docente
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await apiService.delete(`/docente/${id}`);
  },

  /**
   * Agregar competencia a docente
   * @param {string} docenteId - UUID del docente
   * @param {string} asignaturaId - UUID de la asignatura
   * @returns {Promise<Object>}
   */
  addCompetencia: async (docenteId, asignaturaId) => {
    const response = await apiService.post(`/docente/${docenteId}/competencia/${asignaturaId}`);
    return extractData(response);
  },

  /**
   * Remover competencia de docente
   * @param {string} docenteId - UUID del docente
   * @param {string} asignaturaId - UUID de la asignatura
   * @returns {Promise<Object>}
   */
  removeCompetencia: async (docenteId, asignaturaId) => {
    const response = await apiService.delete(`/docente/${docenteId}/competencia/${asignaturaId}`);
    return extractData(response);
  },

  /**
   * Actualizar todas las competencias de un docente
   * @param {string} docenteId - UUID del docente
   * @param {Array<string>} asignaturaIds - IDs de asignaturas
   * @returns {Promise<Object>}
   */
  updateCompetencias: async (docenteId, asignaturaIds) => {
    const response = await apiService.patch(`/docente/${docenteId}/competencias`, {
      asignaturaIds
    });
    return extractData(response);
  }
};
