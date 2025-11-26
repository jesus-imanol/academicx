import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const PageHeader = ({ 
  title, 
  subtitle, 
  onClose 
}) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <div className="flex flex-col gap-2">
        <p className="text-black text-3xl md:text-4xl font-black leading-tight tracking-tighter">
          {title}
        </p>
        {subtitle && (
          <p className="text-[#a19cba] text-base font-normal leading-normal">
            {subtitle}
          </p>
        )}
      </div>
      {onClose && (
        <Button variant="icon" onClick={onClose}>
          <Icon name="close" className="text-[#a19cba]" />
        </Button>
      )}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onClose: PropTypes.func
};

export default PageHeader;
