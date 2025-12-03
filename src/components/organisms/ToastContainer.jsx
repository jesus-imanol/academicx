import PropTypes from 'prop-types';
import Toast from '../molecules/Toast';

/**
 * Contenedor para múltiples Toast notifications
 */
const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
  onClose: PropTypes.func.isRequired,
};

export default ToastContainer;
