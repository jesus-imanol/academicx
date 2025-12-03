import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api';

/**
 * Extrae los datos de la respuesta del backend
 * El backend responde con: { statusCode, success, data, timestamp }
 */
const extractData = (response) => {
  return response.data?.data || response.data;
};

/**
 * Servicio para operaciones con Alumnos
 */
export const alumnoService = {
  /**
   * Obtener todos los alumnos
   * @returns {Promise<Array>} Lista de alumnos
   */
  getAll: async () => {
    const response = await apiService.get(API_ENDPOINTS.alumnos.base);
    return extractData(response);
  },

  /**
   * Obtener un alumno por ID
   * @param {string} id - UUID del alumno
   * @returns {Promise<Object>} Datos del alumno
   */
  getById: async (id) => {
    const response = await apiService.get(API_ENDPOINTS.alumnos.byId(id));
    return extractData(response);
  },

  /**
   * Buscar alumno por matrícula
   * @param {string} matricula - Matrícula del alumno
   * @returns {Promise<Object>} Datos del alumno
   */
  getByMatricula: async (matricula) => {
    const response = await apiService.get(API_ENDPOINTS.alumnos.byMatricula(matricula));
    return extractData(response);
  },

  /**
   * Buscar alumnos por cuatrimestre
   * @param {number} cuatrimestre - Número de cuatrimestre
   * @returns {Promise<Array>} Lista de alumnos
   */
  getByCuatrimestre: async (cuatrimestre) => {
    const response = await apiService.get(API_ENDPOINTS.alumnos.byCuatrimestre(cuatrimestre));
    return extractData(response);
  },

  /**
   * Obtener el conteo total de alumnos
   * @returns {Promise<Object>} {count: number}
   */
  getCount: async () => {
    const response = await apiService.get(API_ENDPOINTS.alumnos.count);
    return extractData(response);
  },

  /**
   * Crear un nuevo alumno
   * @param {Object} alumnoData - Datos del alumno
   * @param {string} alumnoData.nombre - Nombre completo
   * @param {string} alumnoData.matricula - Matrícula única
   * @param {number} alumnoData.cuatrimestreActual - Cuatrimestre actual
   * @returns {Promise<Object>} Alumno creado
   */
  create: async (alumnoData) => {
    const response = await apiService.post(API_ENDPOINTS.alumnos.base, alumnoData);
    return extractData(response);
  },

  /**
   * Actualizar un alumno existente
   * @param {string} id - UUID del alumno
   * @param {Object} alumnoData - Datos a actualizar
   * @returns {Promise<Object>} Alumno actualizado
   */
  update: async (id, alumnoData) => {
    const response = await apiService.patch(API_ENDPOINTS.alumnos.byId(id), alumnoData);
    return extractData(response);
  },

  /**
   * Eliminar un alumno
   * @param {string} id - UUID del alumno
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await apiService.delete(API_ENDPOINTS.alumnos.byId(id));
  },
};
