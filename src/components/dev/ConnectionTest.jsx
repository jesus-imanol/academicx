import { useState } from 'react';
import { apiService } from '../../services/api.service';
import { API_CONFIG } from '../../config/api';

/**
 * Componente de diagnóstico para verificar la conexión con el backend
 * Solo se usa en desarrollo
 */
const ConnectionTest = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setStatus(null);
    setDetails(null);

    try {
      const response = await apiService.get('/alumno');
      setStatus('success');
      setDetails({
        message: '✅ Conexión exitosa con el backend',
        url: API_CONFIG.baseURL,
        data: response.data,
        status: response.status,
      });
    } catch (error) {
      setStatus('error');
      
      if (!error.response) {
        setDetails({
          message: '❌ No se puede conectar con el backend',
          url: API_CONFIG.baseURL,
          error: error.code || 'ERR_NETWORK',
          suggestion: 'Verifica que el backend esté corriendo en el puerto correcto',
          helpDocs: '/TROUBLESHOOTING.md'
        });
      } else {
        setDetails({
          message: '⚠️ El backend respondió con error',
          url: API_CONFIG.baseURL,
          status: error.response.status,
          data: error.response.data,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (import.meta.env.PROD) {
    return null; // No mostrar en producción
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-[#1a1625] border border-white/10 rounded-lg p-4 max-w-md shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-bold">🔧 Backend Connection Test</h3>
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-3 py-1 bg-primary text-white text-xs font-bold rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Testing...' : 'Test'}
        </button>
      </div>

      <div className="text-xs text-white/60 mb-2">
        Target: <code className="text-cyan-400">{API_CONFIG.baseURL}</code>
      </div>

      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3 text-green-400 text-xs">
          <div className="font-bold mb-1">{details.message}</div>
          <div>Status: {details.status}</div>
          <div>Alumnos: {Array.isArray(details.data) ? details.data.length : 'N/A'}</div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-red-400 text-xs">
          <div className="font-bold mb-1">{details.message}</div>
          {details.error && <div>Error: {details.error}</div>}
          {details.status && <div>Status: {details.status}</div>}
          {details.suggestion && (
            <div className="mt-2 text-yellow-400">
              💡 {details.suggestion}
            </div>
          )}
          {details.helpDocs && (
            <div className="mt-2">
              <a
                href={details.helpDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Ver guía de solución de problemas
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
