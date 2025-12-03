import { useState, useCallback } from 'react';
import { docenteService } from '../services/docente.service';
import { getErrorMessage, logError, logSuccess } from '../utils/errorMessages';
import { useToast } from './useToast';

/**
 * Hook personalizado para manejar operaciones de Docentes
 */
export const useDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  /**
   * Obtener todos los docentes
   */
  const fetchDocentes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await docenteService.getAll();
      setDocentes(data || []);
      logSuccess('Fetch Docentes', { count: data?.length || 0 });
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'docente');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Docentes', err);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener docente por ID
   */
  const fetchDocenteById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await docenteService.getById(id);
      logSuccess('Fetch Docente By ID', data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'docente');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Docente By ID', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener conteo de docentes
   */
  const fetchDocentesCount = useCallback(async () => {
    try {
      const data = await docenteService.getCount();
      logSuccess('Fetch Docentes Count', data);
      return data.count;
    } catch (err) {
      logError('Fetch Docentes Count', err);
      return 0;
    }
  }, []);

  /**
   * Buscar docentes por asignatura
   */
  const fetchDocentesByAsignatura = useCallback(async (asignaturaId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await docenteService.getByAsignatura(asignaturaId);
      logSuccess('Fetch Docentes By Asignatura', { asignaturaId, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'docente');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Docentes By Asignatura', err, { asignaturaId });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Crear docente
   */
  const createDocente = useCallback(async (docenteData) => {
    setLoading(true);
    setError(null);

    try {
      const newDocente = await docenteService.create(docenteData);
      setDocentes((prev) => [newDocente, ...prev]);
      toast.success('Docente creado exitosamente');
      logSuccess('Create Docente', newDocente);
      return { success: true, data: newDocente };
    } catch (err) {
      const statusCode = err.response?.status;
      
      let userMessage = 'Error al crear docente';
      
      if (statusCode === 404) {
        userMessage = 'Una o más asignaturas especificadas no existen';
      } else if (statusCode === 400) {
        userMessage = 'Datos inválidos. Verifica los campos e intenta de nuevo';
      } else if (statusCode === 500) {
        userMessage = 'Error del servidor. Intenta de nuevo más tarde';
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Create Docente', err, { docenteData });
      return { success: false, error: userMessage, statusCode };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar docente
   */
  const updateDocente = useCallback(async (id, docenteData) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await docenteService.update(id, docenteData);
      setDocentes((prev) =>
        prev.map((doc) => (doc.id === id ? updated : doc))
      );
      toast.success('Docente actualizado exitosamente');
      logSuccess('Update Docente', updated);
      return { success: true, data: updated };
    } catch (err) {
      const statusCode = err.response?.status;
      
      let userMessage = 'Error al actualizar docente';
      
      if (statusCode === 404) {
        userMessage = 'Docente o asignatura no encontrada';
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Update Docente', err, { id, docenteData });
      return { success: false, error: userMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Eliminar docente
   */
  const deleteDocente = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await docenteService.delete(id);
      setDocentes((prev) => prev.filter((doc) => doc.id !== id));
      toast.success('Docente eliminado exitosamente');
      logSuccess('Delete Docente', { id });
      return true;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'docente');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Delete Docente', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Agregar competencia
   */
  const addCompetencia = useCallback(async (docenteId, asignaturaId) => {
    setLoading(true);
    setError(null);

    try {
      await docenteService.addCompetencia(docenteId, asignaturaId);
      toast.success('Competencia agregada exitosamente');
      logSuccess('Add Competencia', { docenteId, asignaturaId });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al agregar competencia';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Add Competencia', err, { docenteId, asignaturaId });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Remover competencia
   */
  const removeCompetencia = useCallback(async (docenteId, asignaturaId) => {
    setLoading(true);
    setError(null);

    try {
      await docenteService.removeCompetencia(docenteId, asignaturaId);
      toast.success('Competencia removida exitosamente');
      logSuccess('Remove Competencia', { docenteId, asignaturaId });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al remover competencia';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Remove Competencia', err, { docenteId, asignaturaId });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar todas las competencias
   */
  const updateCompetencias = useCallback(async (docenteId, asignaturaIds) => {
    setLoading(true);
    setError(null);

    try {
      await docenteService.updateCompetencias(docenteId, asignaturaIds);
      toast.success('Competencias actualizadas exitosamente');
      logSuccess('Update Competencias', { docenteId, asignaturaIds });
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al actualizar competencias';
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Update Competencias', err, { docenteId, asignaturaIds });
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    // Estado
    docentes,
    loading,
    error,
    
    // Operaciones CRUD
    fetchDocentes,
    fetchDocenteById,
    fetchDocentesCount,
    fetchDocentesByAsignatura,
    createDocente,
    updateDocente,
    deleteDocente,
    
    // Gestión de competencias
    addCompetencia,
    removeCompetencia,
    updateCompetencias,
    
    // Toast
    toast,
  };
};
