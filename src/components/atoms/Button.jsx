import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  className = '' 
}) => {
  const baseClasses = 'font-bold py-3 px-6 rounded-lg transition-all';
  
  const variants = {
    primary: 'noisy-gradient text-black shadow-lg hover:shadow-primary/30 hover:cursor-pointer',
    secondary: 'bg-transparent border border-white/20 text-[#a19cba] hover:bg-white/10 hover:text-white',
    icon: 'flex items-center justify-center size-10 bg-[#1A1A2E] border border-white/10 rounded-full hover:bg-white/10'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Button;
