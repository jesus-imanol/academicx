import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const NavItem = ({ 
  icon, 
  label, 
  href = '#', 
  active = false,
  filled = false,
  onClick 
}) => {
  const baseClasses = 'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors';
  const activeClasses = active 
    ? 'bg-primary/20 text-white' 
    : 'text-[#a19cba] hover:text-white hover:bg-white/5';

  return (
    <a 
      href={href} 
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
    >
      <Icon name={icon} filled={filled} />
      <p className="text-sm font-medium leading-normal">{label}</p>
    </a>
  );
};

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  active: PropTypes.bool,
  filled: PropTypes.bool,
  onClick: PropTypes.func
};

export default NavItem;
