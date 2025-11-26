import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const Toast = ({ 
  type = 'success', 
  message, 
  onClose,
  visible = true 
}) => {
  if (!visible) return null;

  const types = {
    success: {
      icon: 'check_circle',
      borderColor: 'border-[#2ECC71]/50',
      iconColor: 'text-[#2ECC71]'
    },
    error: {
      icon: 'error',
      borderColor: 'border-[#E74C3C]/50',
      iconColor: 'text-[#E74C3C]'
    },
    warning: {
      icon: 'warning',
      borderColor: 'border-[#F39C12]/50',
      iconColor: 'text-[#F39C12]'
    },
    info: {
      icon: 'info',
      borderColor: 'border-[#3498DB]/50',
      iconColor: 'text-[#3498DB]'
    }
  };

  const config = types[type];

  return (
    <div className={`absolute bottom-5 right-5 flex w-full max-w-sm items-center gap-4 rounded-lg border ${config.borderColor} bg-[#1A1B23] p-4 text-white shadow-lg z-50 animate-slide-in`}>
      <Icon name={config.icon} className={config.iconColor} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-[#E0E0E0]/60 hover:text-white transition-colors"
        >
          <Icon name="close" className="text-xl" />
        </button>
      )}
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool
};

export default Toast;
