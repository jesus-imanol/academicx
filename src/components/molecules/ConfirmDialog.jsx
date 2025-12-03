import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const ConfirmDialog = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title, 
  message, 
  confirmText = 'Sí, continuar',
  cancelText = 'No, volver',
  type = 'success' // 'success', 'warning', 'error', 'info'
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: 'check_circle',
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/20',
      buttonBg: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
      buttonShadow: 'hover:shadow-green-500/50'
    },
    warning: {
      icon: 'warning',
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-500/20',
      buttonBg: 'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
      buttonShadow: 'hover:shadow-yellow-500/50'
    },
    error: {
      icon: 'error',
      iconColor: 'text-red-500',
      iconBg: 'bg-red-500/20',
      buttonBg: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      buttonShadow: 'hover:shadow-red-500/50'
    },
    info: {
      icon: 'info',
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/20',
      buttonBg: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      buttonShadow: 'hover:shadow-blue-500/50'
    }
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-[#252233] rounded-2xl border border-white/10 shadow-2xl max-w-md w-full animate-scale-in">
        {/* Icon */}
        <div className="flex justify-center pt-8">
          <div className={`flex items-center justify-center w-16 h-16 rounded-full ${style.iconBg}`}>
            <Icon name={style.icon} className={`text-4xl ${style.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">
            {title}
          </h3>
          <p className="text-[#a19cba] text-sm sm:text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
          <button
            onClick={onConfirm}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg h-11 sm:h-12 px-4 bg-gradient-to-r ${style.buttonBg} text-white text-sm sm:text-base font-bold transition-all duration-300 ${style.buttonShadow} shadow-lg`}
          >
            <Icon name="check" className="text-lg" />
            <span>{confirmText}</span>
          </button>
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 sm:h-12 px-4 bg-transparent text-[#a19cba] text-sm sm:text-base font-bold border border-white/10 hover:border-[#a19cba] hover:text-white transition-all duration-200"
          >
            <Icon name="close" className="text-lg" />
            <span>{cancelText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
};

export default ConfirmDialog;
