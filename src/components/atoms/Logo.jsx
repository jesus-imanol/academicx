import PropTypes from 'prop-types';

const Logo = ({ size = 10, className = '' }) => {
  return (
    <div 
      className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-${size} ${className}`}
      style={{
        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXKYxgc8kCIJVfmGze0G-mncKyME62knmHapfjtOMjp0-rL8F-0-uUEm0H-KgfBuzdlX7u7OXWHY_IzmKzn5POTfK_2CxZvdCSJCmKYaQgJEtwge9I_OB-kpTk-6LVb4Vtg2-09AQ22gFXA3YmIhcTmUl6rWt8tPk8y6owAb0gg8ChimGEgK3OeE9-Ynl-LrQWuS_zmduciIqKk9DGFThEIbY1AdcYc2QCzflADzl-LRZkB3ZR7MuAScs0apPy3SofW2HSdBjxp44")'
      }}
      aria-label="Concurrent logo"
    />
  );
};

Logo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

export default Logo;
