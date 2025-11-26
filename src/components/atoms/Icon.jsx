import PropTypes from 'prop-types';

const Icon = ({ name, filled = false, className = '' }) => {
  const fillStyle = filled 
    ? { fontVariationSettings: "'FILL' 1" } 
    : { fontVariationSettings: "'FILL' 0" };

  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={fillStyle}
    >
      {name}
    </span>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  filled: PropTypes.bool,
  className: PropTypes.string
};

export default Icon;
