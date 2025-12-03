import { useState, useEffect } from 'react';
import { programaEstudioService } from '../services/programaEstudio.service';

export const useProgramasEstudio = () => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar programas
  const fetchProgramas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await programaEstudioService.getAll();
      setProgramas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching programas:', err);
      setError(err.message || 'Error al cargar programas de estudio');
    } finally {
      setLoading(false);
    }
  };

  // Crear programa
  const createPrograma = async (programaData) => {
    try {
      const newPrograma = await programaEstudioService.create(programaData);
      setProgramas(prev => [...prev, newPrograma]);
      return { success: true, data: newPrograma };
    } catch (err) {
      console.error('Error creating programa:', err);
      
      // Extraer código de estado y mensaje del error
      const statusCode = err.response?.status;
      const errorMessage = err.response?.data?.message || err.message;
      
      let userMessage = 'Error al crear programa de estudio';
      
      if (statusCode === 409 || errorMessage?.includes('ya existe') || errorMessage?.includes('duplicate')) {
        userMessage = 'Ya existe un programa de estudio con ese nombre';
      } else if (statusCode === 400 || errorMessage?.includes('inválido') || errorMessage?.includes('invalid')) {
        userMessage = 'Datos inválidos. Verifica los campos e intenta de nuevo';
      } else if (statusCode === 500) {
        userMessage = 'Error del servidor. Intenta de nuevo más tarde';
      } else if (errorMessage) {
        userMessage = errorMessage;
      }
      
      return { success: false, error: userMessage, statusCode };
    }
  };

  // Actualizar programa
  const updatePrograma = async (id, programaData) => {
    try {
      const updated = await programaEstudioService.update(id, programaData);
      setProgramas(prev => 
        prev.map(prog => prog.id === id ? updated : prog)
      );
      return { success: true, data: updated };
    } catch (err) {
      console.error('Error updating programa:', err);
      return { success: false, error: err.message || 'Error al actualizar programa de estudio' };
    }
  };

  // Eliminar programa
  const deletePrograma = async (id) => {
    try {
      await programaEstudioService.delete(id);
      setProgramas(prev => prev.filter(prog => prog.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting programa:', err);
      return { success: false, error: err.message || 'Error al eliminar programa de estudio' };
    }
  };

  useEffect(() => {
    fetchProgramas();
  }, []);

  return {
    programas,
    loading,
    error,
    createPrograma,
    updatePrograma,
    deletePrograma,
    refetch: fetchProgramas
  };
};
