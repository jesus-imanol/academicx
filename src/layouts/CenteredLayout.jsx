import PropTypes from 'prop-types';

const CenteredLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient blobs */}
        <div className="absolute top-[-20%] left-[-20%] h-96 w-96 rounded-full bg-[#8A2BE2]/10 blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] h-96 w-96 rounded-full bg-[#00FFFF]/10 blur-[100px]"></div>
        
        {/* Geometric shapes */}
        <svg 
          className="absolute top-1/4 left-10 h-24 w-24 text-[#4A4A52]/20" 
          fill="none" 
          height="100" 
          viewBox="0 0 100 100" 
          width="100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M50 0L100 50L50 100L0 50L50 0Z" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
        
        <svg 
          className="absolute bottom-1/4 right-10 h-32 w-32 text-[#4A4A52]/20" 
          fill="none" 
          height="100" 
          viewBox="0 0 100 100" 
          width="100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            cx="50" 
            cy="50" 
            r="49.5" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

CenteredLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default CenteredLayout;
