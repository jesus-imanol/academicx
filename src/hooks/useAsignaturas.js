import { useState, useCallback } from 'react';
import { asignaturaService } from '../services/asignatura.service';
import { getErrorMessage, logError, logSuccess } from '../utils/errorMessages';
import { useToast } from './useToast';

/**
 * Hook personalizado para manejar operaciones de Asignaturas
 */
export const useAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  /**
   * Obtener todas las asignaturas
   */
  const fetchAsignaturas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await asignaturaService.getAll();
      setAsignaturas(data || []);
      logSuccess('Fetch Asignaturas', { count: data?.length || 0 });
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Asignaturas', err);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener asignatura por ID
   */
  const fetchAsignaturaById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await asignaturaService.getById(id);
      logSuccess('Fetch Asignatura By ID', data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Asignatura By ID', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener conteo de asignaturas
   */
  const fetchAsignaturasCount = useCallback(async () => {
    try {
      const data = await asignaturaService.getCount();
      logSuccess('Fetch Asignaturas Count', data);
      return data.count;
    } catch (err) {
      logError('Fetch Asignaturas Count', err);
      return 0;
    }
  }, []);

  /**
   * Buscar asignaturas por cuatrimestre
   */
  const fetchAsignaturasByCuatrimestre = useCallback(async (cuatrimestre) => {
    setLoading(true);
    setError(null);

    try {
      const data = await asignaturaService.getByCuatrimestre(cuatrimestre);
      logSuccess('Fetch Asignaturas By Cuatrimestre', { cuatrimestre, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Asignaturas By Cuatrimestre', err, { cuatrimestre });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar asignaturas por programa
   */
  const fetchAsignaturasByPrograma = useCallback(async (programaId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await asignaturaService.getByPrograma(programaId);
      logSuccess('Fetch Asignaturas By Programa', { programaId, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Asignaturas By Programa', err, { programaId });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar asignaturas por programa y cuatrimestre
   */
  const fetchAsignaturasByProgramaAndCuatrimestre = useCallback(async (programaId, cuatrimestre) => {
    setLoading(true);
    setError(null);

    try {
      const data = await asignaturaService.getByProgramaAndCuatrimestre(programaId, cuatrimestre);
      logSuccess('Fetch Asignaturas By Programa And Cuatrimestre', { programaId, cuatrimestre, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Asignaturas By Programa And Cuatrimestre', err, { programaId, cuatrimestre });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Contar asignaturas por programa
   */
  const fetchCountByPrograma = useCallback(async (programaId) => {
    try {
      const data = await asignaturaService.getCountByPrograma(programaId);
      logSuccess('Fetch Count By Programa', data);
      return data.count;
    } catch (err) {
      logError('Fetch Count By Programa', err, { programaId });
      return 0;
    }
  }, []);

  /**
   * Crear asignatura
   */
  const createAsignatura = useCallback(async (asignaturaData) => {
    setLoading(true);
    setError(null);

    try {
      const newAsignatura = await asignaturaService.create(asignaturaData);
      setAsignaturas((prev) => [newAsignatura, ...prev]);
      toast.success('Asignatura creada exitosamente');
      logSuccess('Create Asignatura', newAsignatura);
      return { success: true, data: newAsignatura };
    } catch (err) {
      const statusCode = err.response?.status;
      const errorMessage = err.response?.data?.message || err.message;
      
      let userMessage = 'Error al crear asignatura';
      
      if (statusCode === 404) {
        userMessage = 'Programa de estudio no encontrado';
      } else if (statusCode === 400) {
        if (errorMessage?.includes('cuatrimestre') || errorMessage?.includes('excede')) {
          userMessage = 'El cuatrimestre excede el límite del programa';
        } else {
          userMessage = 'Datos inválidos. Verifica los campos e intenta de nuevo';
        }
      } else if (statusCode === 500) {
        userMessage = 'Error del servidor. Intenta de nuevo más tarde';
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Create Asignatura', err, { asignaturaData });
      return { success: false, error: userMessage, statusCode };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar asignatura
   */
  const updateAsignatura = useCallback(async (id, asignaturaData) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await asignaturaService.update(id, asignaturaData);
      setAsignaturas((prev) =>
        prev.map((asig) => (asig.id === id ? updated : asig))
      );
      toast.success('Asignatura actualizada exitosamente');
      logSuccess('Update Asignatura', updated);
      return { success: true, data: updated };
    } catch (err) {
      const statusCode = err.response?.status;
      const errorMessage = err.response?.data?.message || err.message;
      
      let userMessage = 'Error al actualizar asignatura';
      
      if (statusCode === 404) {
        userMessage = 'Asignatura o programa no encontrado';
      } else if (statusCode === 400 && (errorMessage?.includes('cuatrimestre') || errorMessage?.includes('excede'))) {
        userMessage = 'El cuatrimestre excede el límite del programa';
      }
      
      setError(userMessage);
      toast.error(userMessage);
      logError('Update Asignatura', err, { id, asignaturaData });
      return { success: false, error: userMessage };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Eliminar asignatura
   */
  const deleteAsignatura = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await asignaturaService.delete(id);
      setAsignaturas((prev) => prev.filter((asig) => asig.id !== id));
      toast.success('Asignatura eliminada exitosamente');
      logSuccess('Delete Asignatura', { id });
      return true;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'asignatura');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Delete Asignatura', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    // Estado
    asignaturas,
    loading,
    error,
    
    // Operaciones CRUD
    fetchAsignaturas,
    fetchAsignaturaById,
    fetchAsignaturasCount,
    fetchAsignaturasByCuatrimestre,
    fetchAsignaturasByPrograma,
    fetchAsignaturasByProgramaAndCuatrimestre,
    fetchCountByPrograma,
    createAsignatura,
    updateAsignatura,
    deleteAsignatura,
    
    // Toast
    toast,
  };
};
