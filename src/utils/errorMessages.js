/**
 * Mensajes de error humanizados para mostrar al usuario
 */
export const ERROR_MESSAGES = {
  // Errores de red
  NETWORK_ERROR: '🔌 No se pudo conectar con el servidor. Verifica que el backend esté corriendo en el puerto correcto.',
  TIMEOUT_ERROR: '⏱️ La solicitud tardó demasiado tiempo. Por favor, inténtalo de nuevo.',
  CORS_ERROR: '🚫 Error de CORS. El servidor necesita permitir peticiones desde este origen.',
  
  // Errores de alumnos
  ALUMNO_NOT_FOUND: 'No se encontró el alumno solicitado.',
  ALUMNO_DUPLICATE_MATRICULA: 'Ya existe un alumno registrado con esta matrícula.',
  ALUMNO_INVALID_DATA: 'Los datos proporcionados no son válidos. Por favor, revisa los campos.',
  ALUMNO_DELETE_SUCCESS: 'El alumno ha sido eliminado exitosamente.',
  ALUMNO_UPDATE_SUCCESS: 'Los datos del alumno se actualizaron correctamente.',
  ALUMNO_CREATE_SUCCESS: 'El alumno se registró exitosamente.',
  
  // Errores generales
  GENERIC_ERROR: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
  VALIDATION_ERROR: 'Por favor, completa todos los campos requeridos correctamente.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  SERVER_ERROR: 'El servidor encontró un problema. Por favor, inténtalo más tarde.',
};

/**
 * Mapea códigos de estado HTTP a mensajes humanizados
 */
export const getErrorMessage = (error, context = 'alumno') => {
  // Error de red
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    }
    if (error.code === 'ERR_NETWORK') {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (error.message?.includes('CORS')) {
      return ERROR_MESSAGES.CORS_ERROR;
    }
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response.status;
  const data = error.response.data;

  // Manejar errores específicos por contexto
  if (context === 'alumno') {
    switch (status) {
      case 404:
        return ERROR_MESSAGES.ALUMNO_NOT_FOUND;
      case 409:
        return ERROR_MESSAGES.ALUMNO_DUPLICATE_MATRICULA;
      case 400:
        return data?.message || ERROR_MESSAGES.ALUMNO_INVALID_DATA;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 500:
      case 502:
      case 503:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return data?.message || ERROR_MESSAGES.GENERIC_ERROR;
    }
  }

  return ERROR_MESSAGES.GENERIC_ERROR;
};

/**
 * Logger mejorado para desarrollo
 */
export const logError = (context, error, additionalInfo = {}) => {
  if (import.meta.env.DEV) {
    console.group(`🔴 Error en ${context}`);
    console.error('Error:', error);
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('URL:', error.config?.url);
    console.error('Base URL:', error.config?.baseURL);
    console.error('Info adicional:', additionalInfo);
    console.groupEnd();
    
    // Ayuda específica para errores comunes
    if (error.code === 'ERR_NETWORK') {
      console.warn(`
⚠️ ERROR DE CONEXIÓN - Posibles causas:
1. El servidor backend NO está corriendo
2. El puerto es incorrecto (verifica .env: ${error.config?.baseURL})
3. Firewall bloqueando la conexión
4. CORS no configurado en el backend

💡 Soluciones:
- Verifica que tu backend esté corriendo
- Ejecuta: curl ${error.config?.baseURL}/alumno
- Revisa la consola del backend
      `);
    }
  }
};

/**
 * Logger para operaciones exitosas
 */
export const logSuccess = (context, data, additionalInfo = {}) => {
  if (import.meta.env.DEV) {
    console.group(`✅ Éxito en ${context}`);
    console.log('Data:', data);
    console.log('Info adicional:', additionalInfo);
    console.groupEnd();
  }
};
