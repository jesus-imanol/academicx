import PropTypes from 'prop-types';
import Input from '../atoms/Input';

const TextField = ({ 
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange, 
  helperText,
  className = '' 
}) => {
  return (
    <label className={`flex flex-col w-full ${className}`}>
      <p className="text-white text-base font-medium leading-normal pb-2">
        {label}
      </p>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {helperText && (
        <p className="text-[#888] text-sm font-normal leading-normal pt-2">
          {helperText}
        </p>
      )}
    </label>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  className: PropTypes.string
};

export default TextField;
