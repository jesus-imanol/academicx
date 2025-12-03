import { useState, useCallback } from 'react';
import { grupoService } from '../services/grupo.service';
import { getErrorMessage, logError, logSuccess } from '../utils/errorMessages';
import { useToast } from './useToast';

/**
 * Hook personalizado para manejar operaciones de Grupos
 */
export const useGrupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  /**
   * Obtener todos los grupos
   */
  const fetchGrupos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await grupoService.getAll();
      setGrupos(data || []);
      logSuccess('Fetch Grupos', { count: data?.length || 0 });
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Grupos', err);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener grupo por ID
   */
  const fetchGrupoById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await grupoService.getById(id);
      logSuccess('Fetch Grupo By ID', data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Grupo By ID', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener conteo de grupos
   */
  const fetchGruposCount = useCallback(async () => {
    try {
      const data = await grupoService.getCount();
      logSuccess('Fetch Grupos Count', data);
      return data.count;
    } catch (err) {
      logError('Fetch Grupos Count', err);
      return 0;
    }
  }, []);

  /**
   * Buscar grupos por asignatura
   */
  const fetchGruposByAsignatura = useCallback(async (asignaturaId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await grupoService.getByAsignatura(asignaturaId);
      logSuccess('Fetch Grupos By Asignatura', { asignaturaId, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Grupos By Asignatura', err, { asignaturaId });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar grupos por docente
   */
  const fetchGruposByDocente = useCallback(async (docenteId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await grupoService.getByDocente(docenteId);
      logSuccess('Fetch Grupos By Docente', { docenteId, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Grupos By Docente', err, { docenteId });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar grupos por alumno
   */
  const fetchGruposByAlumno = useCallback(async (alumnoId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await grupoService.getByAlumno(alumnoId);
      logSuccess('Fetch Grupos By Alumno', { alumnoId, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Grupos By Alumno', err, { alumnoId });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener conteo de alumnos en grupo
   */
  const fetchAlumnosCount = useCallback(async (grupoId) => {
    try {
      const data = await grupoService.getAlumnosCount(grupoId);
      logSuccess('Fetch Alumnos Count', data);
      return data.count;
    } catch (err) {
      logError('Fetch Alumnos Count', err, { grupoId });
      return 0;
    }
  }, []);

  /**
   * Crear grupo
   */
  const createGrupo = useCallback(async (grupoData) => {
    setLoading(true);
    setError(null);

    try {
      const newGrupo = await grupoService.create(grupoData);
      setGrupos((prev) => [newGrupo, ...prev]);
      toast.success('Grupo creado exitosamente');
      logSuccess('Create Grupo', newGrupo);
      return { success: true, data: newGrupo };
    } catch (err) {
      const statusCode = err.response?.status;
      
      let userMessage = 'Error al crear grupo';
      
      if (statusCode === 404) {
        userMessage = 'Asignatura, docente o alumno no encontrado';
      } else if (statusCode === 400) {
        const errorDetail = err.response?.data?.message || '';
        if (errorDetail.includes('competencia')) {
          userMessage = 'El docente no tiene competencia en esta asignatura';
        } else {
          userMessage = 'Datos inválidos. Verifica los campos e intenta de nuevo';
        }
      } else if (statusCode === 500) {
        userMessage = 'Error del servidor. Intenta de nuevo más tarde';
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Create Grupo', err, { grupoData });
      return { success: false, error: userMessage, statusCode };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar grupo
   */
  const updateGrupo = useCallback(async (id, grupoData) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await grupoService.update(id, grupoData);
      setGrupos((prev) =>
        prev.map((grupo) => (grupo.id === id ? updated : grupo))
      );
      toast.success('Grupo actualizado exitosamente');
      logSuccess('Update Grupo', updated);
      return { success: true, data: updated };
    } catch (err) {
      const statusCode = err.response?.status;
      
      let userMessage = 'Error al actualizar grupo';
      
      if (statusCode === 404) {
        userMessage = 'Grupo, asignatura, docente o alumno no encontrado';
      } else if (statusCode === 400) {
        const errorDetail = err.response?.data?.message || '';
        if (errorDetail.includes('competencia')) {
          userMessage = 'El docente no tiene competencia en esta asignatura';
        } else {
          userMessage = 'Datos inválidos';
        }
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Update Grupo', err, { id, grupoData });
      return { success: false, error: userMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Eliminar grupo
   */
  const deleteGrupo = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await grupoService.delete(id);
      setGrupos((prev) => prev.filter((grupo) => grupo.id !== id));
      toast.success('Grupo eliminado exitosamente');
      logSuccess('Delete Grupo', { id });
      return true;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'grupo');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Delete Grupo', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Inscribir alumno en grupo
   */
  const enrollStudent = useCallback(async (grupoId, alumnoId) => {
    setLoading(true);
    setError(null);

    try {
      await grupoService.enrollStudent(grupoId, alumnoId);
      toast.success('Alumno inscrito exitosamente');
      logSuccess('Enroll Student', { grupoId, alumnoId });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al inscribir alumno';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Enroll Student', err, { grupoId, alumnoId });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Dar de baja alumno
   */
  const unenrollStudent = useCallback(async (grupoId, alumnoId) => {
    setLoading(true);
    setError(null);

    try {
      await grupoService.unenrollStudent(grupoId, alumnoId);
      toast.success('Alumno dado de baja exitosamente');
      logSuccess('Unenroll Student', { grupoId, alumnoId });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al dar de baja alumno';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Unenroll Student', err, { grupoId, alumnoId });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar lista de alumnos
   */
  const updateStudents = useCallback(async (grupoId, alumnoIds) => {
    setLoading(true);
    setError(null);

    try {
      await grupoService.updateStudents(grupoId, alumnoIds);
      toast.success('Lista de alumnos actualizada exitosamente');
      logSuccess('Update Students', { grupoId, alumnoIds });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al actualizar lista de alumnos';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Update Students', err, { grupoId, alumnoIds });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    // Estado
    grupos,
    loading,
    error,
    
    // Operaciones CRUD
    fetchGrupos,
    fetchGrupoById,
    fetchGruposCount,
    fetchGruposByAsignatura,
    fetchGruposByDocente,
    fetchGruposByAlumno,
    fetchAlumnosCount,
    createGrupo,
    updateGrupo,
    deleteGrupo,
    
    // Gestión de alumnos
    enrollStudent,
    unenrollStudent,
    updateStudents,
    
    // Toast
    toast,
  };
};
