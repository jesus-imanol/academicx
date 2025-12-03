import { apiService } from './api.service';

/**
 * Extrae los datos de la respuesta del backend
 * El backend responde con: { statusCode, success, data, timestamp }
 */
const extractData = (response) => {
  return response.data?.data || response.data;
};

/**
 * Servicio para operaciones con Grupos
 */
export const grupoService = {
  /**
   * Obtener todos los grupos
   * @returns {Promise<Array>} Lista de grupos con sus relaciones
   */
  getAll: async () => {
    const response = await apiService.get('/grupo');
    return extractData(response);
  },

  /**
   * Obtener un grupo por ID
   * @param {string} id - UUID del grupo
   * @returns {Promise<Object>} Datos del grupo con relaciones completas
   */
  getById: async (id) => {
    const response = await apiService.get(`/grupo/${id}`);
    return extractData(response);
  },

  /**
   * Obtener el conteo total de grupos
   * @returns {Promise<Object>} {count: number}
   */
  getCount: async () => {
    const response = await apiService.get('/grupo/stats/count');
    return extractData(response);
  },

  /**
   * Buscar grupos por asignatura
   * @param {string} asignaturaId - UUID de la asignatura
   * @returns {Promise<Array>} Lista de grupos de esa asignatura
   */
  getByAsignatura: async (asignaturaId) => {
    const response = await apiService.get(`/grupo/filter/asignatura/${asignaturaId}`);
    return extractData(response);
  },

  /**
   * Buscar grupos por docente
   * @param {string} docenteId - UUID del docente
   * @returns {Promise<Array>} Lista de grupos del docente
   */
  getByDocente: async (docenteId) => {
    const response = await apiService.get(`/grupo/filter/docente/${docenteId}`);
    return extractData(response);
  },

  /**
   * Buscar grupos por alumno
   * @param {string} alumnoId - UUID del alumno
   * @returns {Promise<Array>} Lista de grupos del alumno
   */
  getByAlumno: async (alumnoId) => {
    const response = await apiService.get(`/grupo/filter/alumno/${alumnoId}`);
    return extractData(response);
  },

  /**
   * Contar alumnos en un grupo
   * @param {string} grupoId - UUID del grupo
   * @returns {Promise<Object>} {count: number}
   */
  getAlumnosCount: async (grupoId) => {
    const response = await apiService.get(`/grupo/${grupoId}/alumnos/count`);
    return extractData(response);
  },

  /**
   * Crear un nuevo grupo
   * @param {Object} grupoData - Datos del grupo
   * @param {string} grupoData.nombre - Nombre del grupo (ej: "9A")
   * @param {string} grupoData.asignaturaId - UUID de la asignatura
   * @param {string} grupoData.docenteId - UUID del docente
   * @param {Array<string>} grupoData.alumnoIds - IDs de alumnos (opcional)
   * @returns {Promise<Object>} Grupo creado
   */
  create: async (grupoData) => {
    const response = await apiService.post('/grupo', grupoData);
    return extractData(response);
  },

  /**
   * Actualizar un grupo existente
   * @param {string} id - UUID del grupo
   * @param {Object} grupoData - Datos a actualizar
   * @returns {Promise<Object>} Grupo actualizado
   */
  update: async (id, grupoData) => {
    const response = await apiService.patch(`/grupo/${id}`, grupoData);
    return extractData(response);
  },

  /**
   * Eliminar un grupo
   * @param {string} id - UUID del grupo
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await apiService.delete(`/grupo/${id}`);
  },

  /**
   * Inscribir alumno en grupo
   * @param {string} grupoId - UUID del grupo
   * @param {string} alumnoId - UUID del alumno
   * @returns {Promise<Object>}
   */
  enrollStudent: async (grupoId, alumnoId) => {
    const response = await apiService.post(`/grupo/${grupoId}/alumno/${alumnoId}`);
    return extractData(response);
  },

  /**
   * Dar de baja alumno de grupo
   * @param {string} grupoId - UUID del grupo
   * @param {string} alumnoId - UUID del alumno
   * @returns {Promise<Object>}
   */
  unenrollStudent: async (grupoId, alumnoId) => {
    const response = await apiService.delete(`/grupo/${grupoId}/alumno/${alumnoId}`);
    return extractData(response);
  },

  /**
   * Actualizar lista completa de alumnos
   * @param {string} grupoId - UUID del grupo
   * @param {Array<string>} alumnoIds - IDs de alumnos
   * @returns {Promise<Object>}
   */
  updateStudents: async (grupoId, alumnoIds) => {
    const response = await apiService.patch(`/grupo/${grupoId}/alumnos`, {
      alumnoIds
    });
    return extractData(response);
  }
};
