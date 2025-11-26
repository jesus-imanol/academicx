import PropTypes from 'prop-types';
import Icon from './Icon';

const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  className = '' 
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={onChange}
        className={`form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-white/5 h-12 placeholder:text-[#a19cba] px-4 text-sm font-normal leading-normal transition-all duration-200 ${className}`}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
        <Icon name="expand_more" />
      </div>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ])
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default Select;
