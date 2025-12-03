import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar notificaciones Toast
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  /**
   * Mostrar un toast
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo: 'success' | 'error' | 'warning' | 'info'
   * @param {number} duration - Duración en ms (default: 5000)
   */
  const showToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove después de la duración especificada
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const success = useCallback((message, duration) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
  };
};
