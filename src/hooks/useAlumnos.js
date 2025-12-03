import { useState, useCallback } from 'react';
import { alumnoService } from '../services/alumno.service';
import { getErrorMessage, logError, logSuccess, ERROR_MESSAGES } from '../utils/errorMessages';
import { useToast } from './useToast';

/**
 * Hook personalizado para manejar todas las operaciones de Alumnos
 * Incluye manejo de estado, errores y notificaciones
 */
export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  /**
   * Obtener todos los alumnos
   */
  const fetchAlumnos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await alumnoService.getAll();
      setAlumnos(data || []);
      logSuccess('Fetch Alumnos', { count: data?.length || 0 });
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Alumnos', err);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener un alumno por ID
   */
  const fetchAlumnoById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await alumnoService.getById(id);
      logSuccess('Fetch Alumno By ID', data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Alumno By ID', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar alumno por matrícula
   */
  const fetchAlumnoByMatricula = useCallback(async (matricula) => {
    setLoading(true);
    setError(null);

    try {
      const data = await alumnoService.getByMatricula(matricula);
      logSuccess('Fetch Alumno By Matrícula', data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Alumno By Matrícula', err, { matricula });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Buscar alumnos por cuatrimestre
   */
  const fetchAlumnosByCuatrimestre = useCallback(async (cuatrimestre) => {
    setLoading(true);
    setError(null);

    try {
      const data = await alumnoService.getByCuatrimestre(cuatrimestre);
      logSuccess('Fetch Alumnos By Cuatrimestre', { cuatrimestre, count: data?.length || 0 });
      return data || [];
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Fetch Alumnos By Cuatrimestre', err, { cuatrimestre });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Obtener el conteo de alumnos
   */
  const fetchAlumnosCount = useCallback(async () => {
    try {
      const data = await alumnoService.getCount();
      logSuccess('Fetch Alumnos Count', data);
      return data.count;
    } catch (err) {
      logError('Fetch Alumnos Count', err);
      return 0;
    }
  }, []);

  /**
   * Crear un nuevo alumno
   */
  const createAlumno = useCallback(async (alumnoData) => {
    setLoading(true);
    setError(null);

    try {
      const newAlumno = await alumnoService.create(alumnoData);
      setAlumnos((prev) => [newAlumno, ...prev]);
      toast.success(ERROR_MESSAGES.ALUMNO_CREATE_SUCCESS);
      logSuccess('Create Alumno', newAlumno);
      return newAlumno;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Create Alumno', err, { alumnoData });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar un alumno existente
   */
  const updateAlumno = useCallback(async (id, alumnoData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedAlumno = await alumnoService.update(id, alumnoData);
      setAlumnos((prev) =>
        prev.map((alumno) => (alumno.id === id ? updatedAlumno : alumno))
      );
      toast.success(ERROR_MESSAGES.ALUMNO_UPDATE_SUCCESS);
      logSuccess('Update Alumno', updatedAlumno);
      return updatedAlumno;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Update Alumno', err, { id, alumnoData });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Eliminar un alumno
   */
  const deleteAlumno = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await alumnoService.delete(id);
      setAlumnos((prev) => prev.filter((alumno) => alumno.id !== id));
      toast.success(ERROR_MESSAGES.ALUMNO_DELETE_SUCCESS);
      logSuccess('Delete Alumno', { id });
      return true;
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'alumno');
      setError(errorMsg);
      toast.error(errorMsg);
      logError('Delete Alumno', err, { id });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    // Estado
    alumnos,
    loading,
    error,
    
    // Operaciones CRUD
    fetchAlumnos,
    fetchAlumnoById,
    fetchAlumnoByMatricula,
    fetchAlumnosByCuatrimestre,
    fetchAlumnosCount,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    
    // Toast notifications
    toast,
  };
};
