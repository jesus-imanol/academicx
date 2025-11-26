import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const PasswordInput = ({ 
  placeholder = 'Enter password', 
  value, 
  onChange, 
  className = '' 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-white/5 h-12 placeholder:text-[#a19cba] pl-4 pr-10 text-sm font-normal leading-normal transition-all duration-200 ${className}`}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <Icon name={showPassword ? 'visibility' : 'visibility_off'} className="text-base" />
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default PasswordInput;
